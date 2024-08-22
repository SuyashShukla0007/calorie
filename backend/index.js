const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connect = require('./database/connection');
const  userRouter  = require('./routes/user'); // Assuming userRouter is exported from routes/index.js
const connectDB =require('./database/connection');
const foodRouter=require('./routes/food')
const app = express();
const port = 5000;
const secret = 'COralie'; // Replace with your actual secret key

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
connectDB()

app.use(cors());
app.options('*', cors());
// Database connection
connect();

// Routes
app.use('/api', userRouter);
app.use('/api',foodRouter)

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
