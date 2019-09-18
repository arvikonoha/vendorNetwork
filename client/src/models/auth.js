import {
  action,
  thunk
} from "easy-peasy";
import axios from 'axios'

const auth = {
  isAuth: false,
  token: '',
  user: {},
  profile: null,
  setAuth: action((state, isAuth) => {
    return {
      ...state,
      isAuth
    }
  }),
  setToken: action((state, token) => {
    return {
      ...state,
      token
    }
  }),
  setUser: action((state, user) => {
    return {
      ...state,
      user
    }
  }),
  setProfile: action((state, profile) => {
    return {
      ...state,
      profile
    }
  }),
  getUser: thunk(async (action) => {
    try {
      let token = localStorage.getItem('token')
      let config = {
        headers: {
          'X-Auth-Token': token
        }
      }
      let user = await axios.get('/user', config)
      action.setUser(user.data)
      action.setAuth(true)

      let profile = await axios.get(`/profile/${user.data._id}`)
      action.setProfile(profile.data)

    } catch (error) {
      console.log(error.response.data)
      action.setToken('')
    }
  }),
}

export default auth