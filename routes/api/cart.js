const route = require('express').Router()
const User = require('../../models/User')
const nodemailer = require('nodemailer')
const config = require('config')

route.post('/', (req, res) => {

  let smtpTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "arvikonoha@gmail.com",
      pass: config.get('gmail_pass')
    }
  });


  let mailQueue = req.body.map(
    (item, index) => {
      if (index < req.body.length - 1) {
        let {
          user,
          subcategories
        } = item
        let order = subcategories.map(item => {
          let {
            price,
            subcategory
          } = item
          return `${subcategory} ${price}`
        }).join(` 
              `)
        return {
          user,
          order
        }
      } else
        return item
    }
  )

  console.log(mailQueue)

  mailQueue.forEach(
    function (item, index) {
      if (index < req.body.length - 1) {
        let {
          user,
          order
        } = item
        User.findById(user)
          .then(data => {
            let email = data.email
            console.log(email)
            let mail = {
              from: "arvikonoha@gmail.com",
              to: email,
              subject: 'Order received at Kairos.com',
              text: `Dear Service provider
                We have recieved an order availing your services here at kairos.com. 
                The summery of the order goes like this:
                  ${order}
                Please contact the number ${mailQueue[req.body.length]} to confirm the orders
                      Thank you
                `
            }
            smtpTransport.sendMail(mail, function (error, response) {
              if (error) {
                console.error(error.response);
              } else {
                console.log(response)
                return res.json({
                  done: true
                })
              }
            })
          })
          .catch(error => {
            console.log(error)
            return res.json(error)
          })
      }
    }
  )



})

module.exports = route