const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const API_KEY = process.env.API_KEY;  // Access your API key from environment variables

// Middleware to serve static files (e.g., your HTML, CSS, JS files)
app.use(express.static(path.join(__dirname, '../')));  // Adjust this as per your directory structure

// Endpoint to provide the API key
app.get('/api/key', (req, res) => {
  res.json({ apiKey: API_KEY });
});

// Other API routes as needed
app.get('/api/maps', async (req, res) => {
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`);
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error making request to Google Maps API');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});