import mongoose from 'mongoose';

async function connect(): Promise<any> {
  try {
    await mongoose.connect(
      'mongodb+srv://default:k0DqNZywFpW15Hu0@cluster0.nbh47.mongodb.net/MEANReviewSite?authSource=admin&replicaSet=atlas-sr3by5-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true',
      { useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true }
    );
    console.log('connected to mongodb');
  } catch (e) {
    console.error('Error connecting to mongodb');
    console.error(e);
  }
}

// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

module.exports = { connect };
