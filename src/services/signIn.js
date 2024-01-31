const Users = require("../models/users/index");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

async function SignIn(req, res) {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({
        code: 400,
        message: "Vui lòng nhập đầy đủ thông tin!",
      });
    }

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    res.headers = headers;
    const findUserDb = await Users.findAll({
      where: {username: username, password: password},
      limit: 10
    }).then((results) => {
      return results[0].dataValues
    }).catch(error => {
      console.log('Error executing SELECT query:', error)
    });
    if (findUserDb) {
      const result = {
        username: findUserDb.username,
        email: findUserDb.email,
        token: generateToken(findUserDb.id),
      };
      return res.status(200).json(result);
    } else {
      return res.status(500).json({
        code: 500,
        message: "Error database!",
      });
    }
  } catch (err) {
    return res.status(500).json({
      code: 500,
      message: err.message,
    });
  }
}

function generateToken(userId) {
  const secretKey = crypto.randomBytes(32).toString("hex");
  const token = jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
  return token;
}
module.exports = SignIn