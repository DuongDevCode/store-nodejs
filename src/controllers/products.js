
const getProductsService = require('../services/products')
const getListProducts = async (req, res) => await getProductsService(req, res)

module.exports = {getListProducts}