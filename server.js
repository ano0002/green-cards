const express = require('express');
const path = require('path');
const app = express();

// Serve static files from 'source' directory
app.use(express.static(path.join(__dirname, 'source')));

// Route handlers
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'source', 'home.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'source', 'login.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Then at the end of the file:
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});