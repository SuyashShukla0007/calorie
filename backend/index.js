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

app.get('/news', async (req, res) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'in',
        category: 'health',
        apiKey: '4495415c9b6b4982b5cd3b9ebe8ddfd2'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching news' });
  }
});

app.use(cors({
  origin: 'https://calorie-rose.vercel.app', // Explicitly allow this origin
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

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
