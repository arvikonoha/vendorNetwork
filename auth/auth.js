const config = require('config')
const jwt = require('jsonwebtoken')

module.exports = function auth(req,res,next){
  let token = req.header('x-auth-token')
  if(!token)
    return res.status(401).json({auth:"User is not authorized"})
  else
    try{
      let decoded = jwt.verify(token,config.get('json_secret'))
      req.user = decoded
      next()
    }
    catch(error){
      res.status(500).json({server:"Server error"})
    }
}