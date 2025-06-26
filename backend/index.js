// backend/index.js

require('dotenv').config(); // This loads the .env file
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // for our "ID cards"

// --- Database Connection ---
const db = new sqlite3.Database('./scoresquad.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the scoresquad.db SQLite database.');
});

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  password TEXT
)`);
// -------------------------

const app = express();
const PORT = 3001;

// --- Middleware ---
app.use(express.json());
// ------------------

// --- Routes ---
app.get('/', (req, res) => {
  res.send('Hello from the ScoreSquad Backend!');
});

// User Registration endpoint
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const sql = `INSERT INTO users (email, password) VALUES (?, ?)`;
    db.run(sql, [email, hashedPassword], function (err) {
      if (err) {
        return res.status(400).json({ error: 'This email is already registered.' });
      }
      res.status(201).json({ message: 'User created successfully', userId: this.lastID });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Our new User Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const sql = `SELECT * FROM users WHERE email = ?`;
  db.get(sql, [email], async (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Server error during login' });
    }
    // Check if user exists
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // User found, now compare passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Passwords match, create a JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' } // Token expires in 24 hours
    );

    res.status(200).json({ message: 'Login successful', token: token });
  });
});

// --------------

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});