const express = require('express');
const app = express();
const port = 3000;
const userRoutes = require('./routes/user.routes');

// Middleware for JSON requests
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Api route
app.use('/api', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});