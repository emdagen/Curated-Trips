const { v4: uuidv4 } = require('uuid');

const { MongoClient } = require('mongodb');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
require('dotenv').config();
const { MONGO_URI } = process.env;

//PATCH that changes trip to completed
const completeBoard = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { email, _id } = req.body;

  try {
    await client.connect();
    const db = client.db('FinalProject');
    const update = await db.collection('CreateTrip').updateOne(
      { email, _id },
      {
        $set: {
          completed: req.body.completed,
          // arrayOfDays: req.body.arrayOfDays,
        },
      },
      {
        upsert: true,
      }
    );

    if (update.modifiedCount > 0) {
      res.status(200).json({ status: 200, msg: 'Trip updated' });
    } else {
      res.status(400).json({ status: 400, msg: 'No updates' });
    }
  } catch (err) {
    res.status(500).json({ status: 500, msg: 'Something went wrong' });
    console.log(err);
  }
  client.close();
};

module.exports = completeBoard;
