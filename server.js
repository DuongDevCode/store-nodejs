const express = require('express')
require('dotenv').config()
const {DB_STORE} = require('./src/config/database') // import variable connect sequelize
// const Product = require('./src/models/users') // import model
const App = require('./src/routers/app')
const cors = require('cors')

const app = express();

app.use('/api', cors(), App)

DB_STORE.sync().then(() => {
  console.log('Database synced')
}).catch((err) => {
  console.error('Unable to sync database:', err)
})

app.listen(process.env.PORT, () => {
  console.log('Server is running on port ' + process.env.PORT)
})