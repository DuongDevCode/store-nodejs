const express = require('express')
const router = express.Router()
const SignIn = require('../../services/signIn')
const multer = require('multer')

const storage = multer.memoryStorage()
const dataForm = multer({
  storage: storage
})

router.post('/', dataForm.single('file') , async (req, res) => await SignIn(req, res))

module.exports = router