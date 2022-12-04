'use strict';

const { v4: uuidv4 } = require('uuid');

const { MongoClient } = require('mongodb');
const buildBoardColumns = require('../utils/handleBoardBuild');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

require('dotenv').config();
const { MONGO_URI } = process.env;

const addCommentHandler = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const { tripId, column, comment } = req.body;
  const columnId = `column-${column + 2}`;

  try {
    await client.connect();
    const db = client.db('FinalProject');

    let trip = await db.collection('CreateTrip').findOne({ _id: tripId });

    const postComment = await db.collection('CreateTrip').updateOne(
      { _id: tripId },
      {
        $push: {
          [`comments.${columnId}`]: {
            columnId,
            tripId,
            comment,
            date: new Date(),
            id: uuidv4(),
            index: column,
          },
        },
      },
      { upsert: true }
    );
    console.log(postComment);

    trip = await db.collection('CreateTrip').findOne({ _id: tripId });

    if (trip) {
      res.status(200).json({
        status: 200,
        message: 'Comment Added',
        data: trip.comments,
      });
    } else {
      res.status(400).json({
        status: 400,
        message: 'Unable to find trip',
        data: trip.comments,
      });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: 'Something went wrong' });
    console.log(err);
  }
  client.close();
};
module.exports = addCommentHandler;
