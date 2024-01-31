const {Sequelize, DataTypes, Model}  = require('sequelize')
const DB_STORE = new Sequelize({
  dialect: 'postgres', //process.env.DB_DIALECT,
  host: 'localhost', //process.env.DB_HOST,
  username: 'postgres', //process.env.DB_USERNAME,
  password: '12345678', //process.env.DB_PASSWORD,
  database: 'postgres', //process.env.DB
})

module.exports = {DB_STORE, Model, DataTypes}