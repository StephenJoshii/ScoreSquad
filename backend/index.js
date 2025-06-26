// backend/index.js

// Import the Express library
const express = require('express');

// Create an instance of an Express application
const app = express();
// Define the port the server will run on
const PORT = 3001; // Using 3001 to avoid conflict with Expo

// Define a basic route
// This handles GET requests to the root URL ('/')
app.get('/', (req, res) => {
  res.send('Hello from the ScoreSquad Backend!');
});

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});