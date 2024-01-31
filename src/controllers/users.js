
const getListUsersService = require('../services/users')
const getListUsers = async (req, res) => await getListUsersService(req, res)

module.exports = {getListUsers}