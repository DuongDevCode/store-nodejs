const express = require('express')
const app = express();

const Users = require('../routers/users/index')
const Login = require('../routers/sign-in/index')
const RegisterUser = require('../routers/register/index')
const Products = require('../routers/products/index')

app.use(express.json())

app.use('/users', Users)
app.use('/sign-in', Login)
app.use('/register', RegisterUser)
app.use('/products', Products)

module.exports = app