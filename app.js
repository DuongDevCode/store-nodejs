const express = require("express");
const app = express();
const crypto = require('crypto');
const multer = require('multer')
const cors = require('cors')
const {Pool} = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '12345678',
  port: 5432
})

app.use(express.json());
app.use(cors());
const upload = multer();

app.get("/posts", async (req, res) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const data = await response.json()
  return res.status(200).json({
    status: 200,
    data: data
  })
}); 

const getDataFromDatabase = async () => {
  try {
    // Kết nối đến cơ sở dữ liệu
    const client = await pool.connect();
    // Thực hiện truy vấn SQL để lấy dữ liệu (ví dụ: lấy tất cả dữ liệu từ bảng "users")
    const result = await client.query('SELECT * FROM users');
    // Hiển thị kết quả
    // console.log('Rows:', result.rows);

    // Giải phóng kết nối
    client.release();
    return result.rows
  } catch (error) {
    console.error('Error executing query:', error);
    return []
  } finally {
    // Đảm bảo pool được giải phóng

  }
};

const resgisterUser = async (username, password, email, phonenumber) => {
  try {
    // Kết nối đến cơ sở dữ liệu
    const client = await pool.connect();
    
    // Thực hiện truy vấn SQL để lấy dữ liệu (ví dụ: lấy tất cả dữ liệu từ bảng "users")
    const result = await client.query(`INSERT INTO users (username, password, email, phonenumber) VALUES ('${username}', '${password}', '${email}', '${phonenumber}')`);
    client.release();
    return result
  } catch (error) {
    console.error('Error executing query:', error);
  }
}

app.post("/api/login", cors(), upload.none(), async (req, res) => {
  const data = await getDataFromDatabase()
  const {username, password} = req.body
  if (!data) {
    return res.status(500).json({
      success: false,
      message: "database disconnected",
      data: null
    })
  } else {
    const requestfromDb = data.filter(p => p.username === username && p.password === password)[0]
    if (requestfromDb) {
      const randomToken = generateRandomToken(16);
      return res.status(200).json({
        success: true,
        message: "Login successfully",
        data: {
          username: requestfromDb.username,
          email: requestfromDb.email,
          phonenumber: requestfromDb.phonenumber,
          token: randomToken
        }
      })
    } else {
      return res.status(200).json({
        success: false,
        message: "Invalid username or password",
        data: null
      })
    }
  }
})

app.post("/api/resgister", upload.none(), async (req, res) => {
  const {username, password, email, phonenumber} = req.body
  const dataAdd = resgisterUser(username, password, email, phonenumber)
  if (dataAdd) {
    return res.status(200).json({
      success: true,
      message: "Register successfully",
    })
  } else {
    return res.status(401).json({
      success: false,
      message: "please fill all fields",
      data: null
    })
  }
})

function generateRandomToken(length) {
  return crypto.randomBytes(length).toString('hex');
}

app.listen(5000, () => {
  console.log("Example app listening on port 5000!");
});
// e:/personal/nodejs
