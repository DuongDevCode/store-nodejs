const express = require('express');
const router = express.Router();
const getListUsersService = require('../../services/users')

router.get('/', async (req, res) => {
  await getListUsersService(req, res)
})

module.exports = router