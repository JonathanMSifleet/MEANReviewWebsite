import express from 'express';
const morgan = require('morgan');
import dotenv = require('dotenv');
import cors = require('cors');
const mongodb = require('./utils/connectMongoDB');

const app = express();

// environment variables:
dotenv.config({ path: './config.env' });

// connect to MongoDB database:
mongodb.connect();

app.use(express.json()); // use middleware
app.use(morgan('dev')); // use middleware

// app.use((error, req, res, next) => {
//   res.status(500).json({ message: error.message });
// });

app.use(cors());

const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

app.use('/auth', userRouter);
app.use('/review', reviewRouter);

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message});
});

app.get('/', (req, res) => {
  res.json('Hello world!');
});

module.exports = app; // export app
