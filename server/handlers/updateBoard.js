'use strict';

const { v4: uuidv4 } = require('uuid');

const { MongoClient } = require('mongodb');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
require('dotenv').config();
const { MONGO_URI } = process.env;

//Keeping client outside of PATCH makes the updates 10x faster.
const client = new MongoClient(MONGO_URI, options);

//PATCH to update changes made in the trip board

const updateBoard = async (req, res) => {
  const { email, _id } = req.body;

  try {
    await client.connect();

    const db = client.db('FinalProject');
    const update = await db.collection('CreateTrip').updateOne(
      { email, _id },
      {
        $set: {
          columns: req.body.columns,
          tasks: req.body.tasks,
          columnOrder: req.body.columnOrder,
        },
      }
    );

    if (update.modifiedCount > 0) {
      res.status(200).json({ status: 200, message: 'Trip has been modified' });
    } else {
      res.status(400).json({ status: 400, message: 'No changes made' });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: 'Something went wrong' });
    console.log(err);
  }
  client.close();
};

module.exports = updateBoard;
