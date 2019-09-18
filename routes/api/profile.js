const route = require('express').Router()

const User = require('../../models/User')
const Profile = require('../../models/Profile')

const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({
  storage
})

const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: 'dsboovpvu',
  api_key: '726677756227695',
  api_secret: 'kClqsvFxI2NA-rVA8OKMh5N_dns'
})

function uploadToCloudinary(image) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, (err, url) => {
      if (err) return reject(err);
      resolve(url);
    })
  });
}

route.post('/:id', upload.single('profile-pic'), async (req, res) => {

  console.log(req.body)
  let {
    title,
    description,
    location,
    address,
    category,
    telephone,
    subcategories,
    email
  } = req.body
  console.log(subcategories)

  subcategories = JSON.parse(subcategories)

  let user = await User.findById(req.params.id)
  if (!user)
    return res.status(404).json({
      user: "user doesn't exist"
    })
  user = req.params.id

  let newProfile = {
    title,
    address,
    description,
    location,
    category,
    telephone,
    description,
    user,
    email
  }

  newProfile.subcategories = []

  subcategories.map(item => newProfile.subcategories.push(item))

  try {

    if (req.file !== undefined) {
      let image = await uploadToCloudinary(req.file.path)

      const fs = require('fs')
      fs.unlinkSync(req.file.path)

      console.log(image)
      newProfile.picsource = image.url
    }

    let profile = await Profile.findOne({
      user: req.params.id
    })

    if (profile) {
      // profile = Profile.findOneAndUpdate({user: req.params.id},{$set: newProfile},{new:true})
      profile = await Profile.findOneAndUpdate({
        user: req.params.id
      }, {
        $set: newProfile
      }, {
        useFindAndModify: false
      })
      console.log('Hello')
      return res.json(profile)
    }
    profile = new Profile(newProfile)
    await profile.save()
    return res.json(profile)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      server: "server error"
    })
  }
})

route.get('/:id', (req, res) => {
  Profile.findOne({
    user: req.params.id
  }).populate('users', 'email').exec((err, data) => {
    if (err) {
      console.log(err)
      return res.status(500).json({
        error: "Server error"
      })
    } else
      res.json(data)
  })
})

route.post('/event/:id', async (req, res) => {
  console.log(req.body)
  let {
    from,
    to,
    description
  } = req.body
  from = new Date(from)
  to = new Date(to)
  try {
    let profile = await Profile.findById(req.params.id)
    profile.schedule.push({
      from,
      to,
      description
    })
    let data = await profile.save()
    return res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      server: "Server error"
    })
  }
})

route.post('/gallery/:id', upload.single('dick'), async (req, res) => {


  try {
    let image = await uploadToCloudinary(req.file.path)

    const fs = require('fs')
    fs.unlinkSync(req.file.path)

    let profile = await Profile.findById(req.params.id)

    profile.gallery.push({
      url: image.url
    })

    profile.save()


    res.json(profile)
  } catch (error) {
    console.log(error)
  }
})


module.exports = route