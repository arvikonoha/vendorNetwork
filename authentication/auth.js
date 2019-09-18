const route = require('express').Router()
const config = require('config')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

route.post('/register',async (req,res) => {
  let {email,password} = req.body
  
  try{
    let user = await User.findOne({email})
    if(user)
      return res.status(400).json({email:'Email already exists'})
    else{
      let salt = await bcrypt.genSalt(10)
      password = await bcrypt.hash(password,salt)
      const newUser = new User({email,password})
      const user = await newUser.save()
      jwt.sign({id: user.id},config.get('json_secret'),{expiresIn: 3*60*60}, (err,token) => {
        if(err)
          throw err
        else{
          let {email,_id} = user
          return res.json({token,user:{email,_id}})
        }
      })
    }
  }
  catch(error){
    console.error(error)
    res.status(500).json({server:"Server err try again later"})
  }
})

route.post('/login',async (req,res) =>{
  let {email,password} = req.body
  try{
    let user = await User.findOne({email})
    if(!user)
      return res.status(400).json({email:"Invalid credentials"})
    else{
      let isMatch = await bcrypt.compare(password,user.password)
      if(!isMatch){
        return res.status(400).json({password:"Invalid credentials"})
      }else{
        jwt.sign({id: user.id},config.get('json_secret'),{expiresIn: 3*60*60}, (err,token) => {
          if(err)
            throw err
          else{
            let {email,_id} = user
            return res.json({token,user:{email,_id}})
          }
        }) 
      }
    }
  }catch(error){
    console.error(error)
    res.status(500).json({server:"Server err try again later"})
  }
})

module.exports = route