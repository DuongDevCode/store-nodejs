const Products = require('../models/products/index')

async function getListUsersService(req, res) {
    try {
      const result = await Products.findAll()
      return res.json(result)
    } catch(err) {
      return res.status(400).json({
        message: err.message
      })
    }
}

module.exports = getListUsersService