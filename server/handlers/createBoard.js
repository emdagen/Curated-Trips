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

//POST that checks if trip exists, else creates one
const createBoard = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const { email, days } = req.body;

  try {
    await client.connect();
    const db = client.db('FinalProject');

    //checks to see if trip to build exists in Mongodb
    let tripPlan = await db
      .collection('CreateTrip')
      .findOne({ email, completed: false });

    //Create new board with x amount of days and zero cards
    if (!tripPlan) {
      if (req.body.days) {
        const dndObj = buildBoardColumns(days);
        //create if doesnt exist
        tripPlan = await db.collection('CreateTrip').insertOne({
          ...req.body,
          ...dndObj, //determine amount of columns
          completed: false,
          _id: uuidv4(),
        });

        //get new document that was just created
        tripPlan = await db
          .collection('CreateTrip')
          .findOne({ _id: tripPlan.insertedId });

        //send data to frontend
        res.status(200).json({
          status: 200,
          message: 'New trip has been created',
          data: tripPlan,
        });
      } else {
        res.status(404).json({
          status: 404,
          message: 'Information is missing, can not create trip',
          data: undefined,
        });
      }
    } else {
      //send document that exists
      res.status(400).json({
        status: 400,
        message: 'A trip is already in progress',
        data: tripPlan,
      });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: 'Something went wrong' });
    console.log(err);
  }
  client.close();
};

module.exports = createBoard;
