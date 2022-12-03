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
  const { email, days } = req.body;

  try {
    await client.connect();
    const db = client.db('FinalProject');

    let tripPlan = await db.collection('EndedTrip').findOne({ email });

    // if (!tripPlan) {
    //   if (req.body.days) {
    //     const dndObj = buildBoardColumns(days);
    //     //create if doesnt exist
    //     tripPlan = await db.collection('EndedTrip').insertOne({
    //       ...req.body,
    //       ...dndObj, //determine amount of columns
    //       completed: false,
    //       _id: uuidv4(),
    //     });

    //     //get new document that was just created
    //     tripPlan = await db
    //       .collection('EndedTrip')
    //       .findOne({ _id: tripPlan.insertedId });

    //     //send data to frontend
    //     res.status(200).json({
    //       status: 200,
    //       message: 'Ended trip has been created',
    //       data: tripPlan,
    //     });
    //   } else {
    //     res.status(404).json({
    //       status: 404,
    //       message: 'Information is missing, can not end trip',
    //       data: undefined,
    //     });
    //   }
    // } else {
    //   //send document that exists
    //   res.status(400).json({
    //     status: 400,
    //     message: 'A trip is already in progress',
    //     data: tripPlan,
    //   });
    // }
  } catch (err) {
    res.status(500).json({ status: 500, message: 'Something went wrong' });
    console.log(err);
    client.close();
  }
};

module.exports = endTrip;
