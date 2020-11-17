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

app.use(morgan('dev')); // use middleware
app.use(express.json()); // use middleware
app.use(cors());

const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

app.use('/user', userRouter);
app.use('/review', reviewRouter);

app.get('/', (req, res) => {
  res.json('Hello world!');
});

module.exports = app; // export app
