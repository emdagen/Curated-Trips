const { builtinModules } = require('module');
const { MongoClient } = require('mongodb');

require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// gets all ended trips with all the updates
const getPastTrips = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db('FinalProject');
    const userCollection = db.collection('user');
    const { _id } = req.params;
    console.log(req.params);
    let user = await userCollection.findOne({ _id });

    const { email } = user;
    const pastTripCollection = db.collection('CreateTrip');
    const tripArray = await pastTripCollection.find({ email }).toArray();

    const crucialData = tripArray.map((trip) => {
      const { _id, arrayOfDays, days, title, email } = trip;
      return {
        _id,
        arrayOfDays,
        days,
        title,
        email,
      };
    });
    console.log(crucialData);
    if (user) {
      res.status(201).json({
        status: 201,
        message: 'Trips found',
        data: crucialData,
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "Couldn't find any trips",
        data: user,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      message: 'Something went wrong. ',
    });
  }
  client.close();
};
module.exports = getPastTrips;
