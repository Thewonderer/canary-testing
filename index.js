let express = require('express');
let app = express();
let ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3000;

// Load haikus with error handling
let haikus;
try {
  haikus = require('./haikus.json');
  console.log('Successfully loaded haikus data');
} catch (error) {
  console.error('Error loading haikus.json:', error.message);
  haikus = [];
}

app.use(express.static('public'))
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  try {
    res.render('index', {haikus: haikus});
  } catch (error) {
    console.error('Error rendering index page:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, (err) => {
  if (err) {
    console.error('Error starting server:', err.message);
    process.exit(1);
  }
  console.log(`Server is running on port ${port}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully');
  process.exit(0);
});