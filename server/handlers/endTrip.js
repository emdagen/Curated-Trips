'use strict';

const { v4: uuidv4 } = require('uuid');

const { MongoClient } = require('mongodb');
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

require('dotenv').config();
const { MONGO_URI } = process.env;
// creates ended trips

const endTrip = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { _id } = req.params;

  try {
    await client.connect();
    const db = client.db('FinalProject');

    const tripPlan = await db.collection('CreateTrip').findOne({ _id });

    const deleteTrip = await db.collection('CreateTrip').deleteOne({ _id });
    console.log(deleteTrip);

    if (deleteTrip.deletedCount > 0) {
      const archivedTrip = await db
        .collection('ArchivedTrip')
        .insertOne({ ...tripPlan, timestamp: Date() });
      res.status(200).json({
        status: 200,
        message: 'Trip Archived',
      });
    } else {
      res.status(400).json({
        status: 400,
        message: 'Unable to find trip',
      });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: 'Something went wrong' });
    console.log(err);
  }
  client.close();
};

module.exports = endTrip;
