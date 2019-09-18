const route = require('express').Router()

const User = require('../../models/User')

const auth = require('../../auth/auth')

route.get('/', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select("-password")
    if (!user)
      return res.status(400).json({
        user: "User not found"
      })
    else
      return res.json(user)
  } catch (error) {
    res.status(500).json({
      server: "Server error"
    })
  }
})

module.exports = route