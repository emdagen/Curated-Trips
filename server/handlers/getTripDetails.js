const { MongoClient } = require('mongodb');

require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getTripDetails = async (req, res) => {
  // console.log('hello you');
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    // console.log('hello');
    const db = client.db('FinalProject');
    const { _id } = req.params;

    const tripCollection = db.collection('CreateTrip');
    const trip = await tripCollection.findOne({ _id });
    // console.log(trip);
    if (trip) {
      res.status(201).json({
        status: 201,
        message: 'We got it!!!',
        data: trip,
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "Couldn't find the trip",
        data: trip,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      message: 'Something went wrong.. ',
    });
  }
  client.close();
};

module.exports = getTripDetails;
