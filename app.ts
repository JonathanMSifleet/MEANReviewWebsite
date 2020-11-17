const fs = require('fs');
import express from 'express';
const morgan = require('morgan');
import mongoose = require('mongoose');
import dotenv = require('dotenv');
import cors = require('cors');

const app = express();

// environment variables:
dotenv.config({ path: './config.env' });

// connection
const DB = 'mongodb+srv://default:k0DqNZywFpW15Hu0@cluster0.nbh47.mongodb.net/MEANReviewSite?authSource=admin&replicaSet=atlas-sr3by5-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true';
// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

// connect to MongoDB database:
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB Connection successful!'));

const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

app.use(morgan('dev')); // use middleware
app.use(express.json()); // use middleware
app.use(cors());

app.use('/user', userRouter);
app.use('/review', reviewRouter);

module.exports = app; // export app
