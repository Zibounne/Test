const express = require('express');
const cors =  require('cors');
const userRoutes = require('./routes/user.routes');

const app = express();
const port = 3000;

// Corse
app.use(cors());

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