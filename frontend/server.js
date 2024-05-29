const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Allow cross-origin resource sharing
app.use(cors());
app.use(express.json());

// Connect to MySQL database
const db = mysql.createConnection({
  host: "localhost",
  user: "",
  password: "",
  database: "",
});

// Test database connection
db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("MySQL database connected successfully");
  }
});

// Login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (error, results) => {
    if (error) {
      res.status(500).json({ message: "Error authenticating user" });
    } else if (results.length === 0) {
      res.status(401).json({ message: "Email or password is incorrect" });
    } else {
      const user = results[0];
      if (user.password === password) {
        res.status(200).json({ message: "User authenticated successfully" });
      } else {
        res.status(401).json({ message: "Email or password is incorrect" });
      }
    }
  });
});

// Registration endpoint
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, password], (error, result) => {
    if (error) {
      res.status(500).json({ message: "Error registering user" });
    } else {
      res.status(200).json({ message: "User registered successfully" });
    }
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
