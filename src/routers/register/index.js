const express = require('express')
const router = express.Router()
const RegisterUser = require('../../services/register')
const multer = require('multer')

const storage = multer.memoryStorage(); // Use memory storage for demo, you can also use disk storage
const dataForm = multer({ storage: storage });

router.post('/', dataForm.single('file'), async (req, res) => {
  await RegisterUser(req.body, res)
})

module.exports = router