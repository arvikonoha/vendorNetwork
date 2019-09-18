const route = require('express').Router()
const Profile = require('../../models/Profile')

route.get('/sort/:sort/location/:location/category/:category/keywords/:keywords/eventRange/:eventRange/page/:page', async (req, res) => {

  let {
    location,
    sort,
    category,
    eventRange,
    keywords,
    page
  } = req.params

  let query = {}

  if (eventRange !== 'none')
    eventRange = JSON.parse(req.params.eventRange)

  let from, to
  if (eventRange !== 'none') {
    from = new Date(eventRange.from)
    to = new Date(eventRange.to)
  } else {
    from = new Date()
    to = new Date()
  }

  if (location !== 'none')
    query.location = location

  if (category !== 'none')
    query.category = category

  if (eventRange !== 'none')
    query.schedule = {
      $elemMatch: {
        $or: [{
            from: {
              $gt: from,
              $gt: to
            }
          },
          {
            from: {
              $lt: from
            },
            to: {
              $lt: from
            }
          }
        ]
      }
    }

  let sortq = {}

  if (sort === 'none' || sort === 'popular') {
    sortq = {
      rating: 1
    }
  } else if (sort === 'pricelo') {
    sortq = {
      'subcategories.price': 1
    }
  } else {
    sortq = {
      'subcategories.price': -1
    }
  }

  console.log(req.params)

  if (keywords !== 'none')
    query.$text = {
      $search: keywords
    }

  let profiles = await Profile.find(query).sort(sortq).skip(10 * (page - 1)).limit(10)

  console.log(profiles)
  res.json(profiles)
})

module.exports = route