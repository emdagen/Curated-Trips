const { MongoClient } = require('mongodb');

require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const client = new MongoClient(MONGO_URI, options);
// checks if user has any trips

const getCurrentTrips = async (req, res) => {
  try {
    await client.connect();

    const db = client.db('FinalProject');
    const userCollection = db.collection('user');
    const { _id } = req.params;
    let user = await userCollection.findOne({ _id });

    const { email } = user;
    const tripCollection = db.collection('CreateTrip');
    const tripArray = await tripCollection.find({ email }).toArray();

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
    // console.log(crucialData);
    if (user) {
      res.status(201).json({
        status: 201,
        message: 'Information found',
        data: crucialData,
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "Couldn't find the user",
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

module.exports = getCurrentTrips;
