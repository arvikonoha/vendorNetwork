const mongoose = require('mongoose')
const searchable = require('mongoose-searchable')

const ProfileSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    text: true
  },
  picsource: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    text: true
  },
  location: {
    type: String,
    required: true,
    text: true
  },
  category: [{
    type: String,
    required: true,
    text: true
  }],
  address: {
    type: String,
    required: true
  },
  subcategories: [{
    subcategory: {
      type: String,
      text: true
    },
    price: {
      type: String
    }
  }],
  userReviews: [{
    name: String,
    description: String,
    rating: Number
  }],
  rating: {
    type: Number,
  },
  additionalDescription: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  telephone: {
    type: String,
    required: true
  },
  gallery: [{
    url: {
      type: String
    },
    description: {
      type: String
    }
  }],
  schedule: [{
    from: {
      type: Date
    },
    to: {
      type: Date
    },
    description: {
      type: String
    }
  }]
})

ProfileSchema.index({
  '$**': 'text'
})

const Profile = mongoose.model('profiles', ProfileSchema)
module.exports = Profile