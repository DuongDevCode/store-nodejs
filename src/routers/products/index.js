const express = require('express');
const router = express.Router();
const getProductsService = require('../../services/products')

router.get('/', async (req, res) => {
  await getProductsService(req, res)
})

module.exports = router