const Users = require('../models/users')
const moment = require('moment')

async function RegisterUser(req, res) {
  try {
    const {username, password, email, phonenumber} = req
    const newUser = await Users.create({
      username: username,
      password: password,
      email: email,
      phonenumber: phonenumber,
      createdat: moment(new Date()).format('YYYY-MM-DD, HH:mm:ss'),
      updatedat: moment(new Date()).format('YYYY-MM-DD, HH:mm:ss')
    })
    newUser.save()
    return res.status(200).json({
      message: 'Insert successfully!'
    })
  } catch(err) {
    return res.status(400).json({
      message: err.message
    })
  }
}

module.exports = RegisterUser