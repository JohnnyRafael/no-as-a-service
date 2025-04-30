const express = require('express');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Load reasons from JSON
const reasons = JSON.parse(fs.readFileSync('./reasons.json', 'utf-8'));

// Rate limiter: 10 requests per minute per IP
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: "Too many requests! Even my patience has limits." }
});

app.use(limiter);
app.use(express.static(path.join(__dirname, 'public')));

// Multiple random rejection reasons endpoint
app.get('/no', (req, res) => {
  // Get 3-5 random reasons
  const count = Math.floor(Math.random() * 3) + 3; // Random number between 3-5
  const selectedReasons = [];
  
  // Ensure we don't select the same reason twice
  const reasonsCopy = [...reasons];
  
  for (let i = 0; i < count; i++) {
    if (reasonsCopy.length === 0) break;
    const randomIndex = Math.floor(Math.random() * reasonsCopy.length);
    selectedReasons.push(reasonsCopy[randomIndex]);
    reasonsCopy.splice(randomIndex, 1);
  }
  
  res.json({ reasons: selectedReasons });
});

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`No-as-a-Service is running on port ${PORT} (but wishes it wasn't)`);
});
