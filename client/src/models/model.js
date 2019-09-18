import {
  action,
  thunk
} from "easy-peasy"
import general from './general.js'
import auth from './auth.js'
import uuid from 'uuid'
import axios from 'axios'

export default {
  auth,
  general,
  search: {
    keywords: [],
    category: 'none',
    sort: 'none',
    eventRange: {},
    location: 'none',
    setEvent: action((state, payload) => {
      return {
        ...state,
        eventRange: {
          from: payload.from,
          to: payload.to
        }
      }
    }),
    setCategory: action((state, payload) => {
      return {
        ...state,
        category: payload
      }
    }),
    setSort: action((state, payload) => {
      return {
        ...state,
        sort: payload
      }
    }),
    setKeywords: action((state, payload) => {
      switch (payload.type) {
        case 'category':
          state.category = payload.result
          break
        case 'sort':
          state.sort = payload.result
          break
        case 'location':
          state.location = payload.result
          break
      }
      state.keywords.push(payload)
    }),
    removeKeyword: action((state, payload) => {
      let keyword = state.keywords.find(keyword => keyword.id === payload)
      switch (keyword.type) {
        case 'category':
          return {
            ...state, category: 'none', keywords: state.keywords.filter(item => item.id !== payload)
          }
          break
        case 'sort':
          return {
            ...state, sort: 'none', keywords: state.keywords.filter(item => item.id !== payload)
          }
          break
        case 'location':
          return {
            ...state, location: 'none', keywords: state.keywords.filter(item => item.id !== payload)
          }
          break
      }
      return {
        ...state,
        keywords: state.keywords.filter(item => item.id !== payload)
      }
    }),
    clearKeywords: action((state) => {
      return {
        ...state,
        keywords: []
      }
    }),
  },
  users: {
    reviews: [{
        uuid: uuid.v4(),
        title: 'Elegent solution...',
        author: 'Divakar K N',
        review: 'I was pleasently surpticed by how easy it is to manage events with this app, will reccomend to anyone and everyone',
        source: 'images/userReview1.jpg'
      },
      {
        uuid: uuid.v4(),
        title: 'Wohoo...',
        author: 'Ria',
        review: 'I really love this platform, Especially the punctuality and on time service provided was amazing',
        source: 'images/userReview4.jpg'
      },
      {
        uuid: uuid.v4(),
        title: 'Must use...',
        author: 'Russ',
        review: 'There are no words to say. Just a great experience',
        source: 'images/userReview3.jpg'
      }
    ]
  },
  vendors: {
    cartItems: [],
    addToCart: action((state, {
      profile,
      id
    }) => {
      if (state.cartItems.some(item => item._id === profile._id)) {
        state.cartItems = state.cartItems.map(item => {
          if (item._id === profile._id) {
            item.subcategories.map(sub => {
              if (sub._id === id) {
                sub.added = true
              }
            })
          }
          return item
        })
      } else {
        profile.subcategories.find(item => item._id === id).added = true
        state.cartItems.push(profile)
      }
    }),
    removeFromCart: action((state, {
      profile,
      id
    }) => {
      state.cartItems = state.cartItems.filter(item => {
        item.subcategories.map(sub => {
          if (sub._id === id) {
            sub.added = false
          }
          return sub
        })
        if (item.subcategories.every(sub => !sub.added))
          return false
        return true
      })
    }),
    server: {},
    setProfile: action((state, payload) => {
      return {
        ...state,
        server: payload
      }
    }),

    servers: [],
    none: false,
    setNone: action((state, payload) => {
      return {
        ...state,
        none: payload
      }
    }),
    setServers: action((state, payload) => {
      return {
        ...state,
        servers: [...payload]
      }
    }),
    getProfiles: thunk(async (action, payload) => {

      let [location, sort, category, eventRange = 'none', keywords = 'none'] = payload
      if (Array.isArray(keywords) && keywords.length > 0)
        keywords = keywords.filter(item => item.type === 'keyword')
      if (keywords.length > 0) {
        keywords = keywords.map(item => item.result).join(' ')
      } else
        keywords = 'none'
      if ([...Object.entries(eventRange)].length === 0 || !eventRange.from && !eventRange.to)
        eventRange = 'none'
      else
        eventRange = JSON.stringify(eventRange)
      console.log(`/services/sort/${sort}/location/${location}/category/${category}/keywords/${keywords}/eventRange/${eventRange}/page/1`)
      try {
        let res = await axios.get(`/services/sort/${sort}/location/${location}/category/${category}/keywords/${keywords}/eventRange/${eventRange}/page/1`)
        if (res.data.length !== 0) {
          let profiles = res.data
          Array.isArray(profiles) && profiles.forEach(item => item.subcategories.map(sub => sub.added = false))
          action.setServers(profiles)
          action.setNone(false)

        }
      } catch (error) {
        console.log(error)
        action.setNone(true)
      }
    }),
    submitCart: thunk((action, payload, {
      getState
    }) => {
      let state = getState()
      let mailData = state.cartItems.map(item => {
        let {
          user,
          location,
          title,
          subcategories,
          email
        } = item
        subcategories = subcategories.filter(sub => sub.added).map(subf => {

          let {
            price,
            subcategory
          } = subf

          return {
            price,
            subcategory
          }
        })

        // subcategories = JSON.stringify(subcategories)

        console.log(subcategories)

        return {
          location,
          title,
          subcategories,
          email,
          user
        }
      })
      mailData.push(payload)
      // mailData = JSON.stringify(mailData)
      axios.post('/cart/', mailData)
        .then(res => {
          if (res.data.done) {
            window.location.href = '/'
            state.cartItems = []
          }
        })
        .catch(error => console.error(error))
    })
  }
}