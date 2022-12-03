'use strict';

const { v4: uuidv4 } = require('uuid');

const { MongoClient } = require('mongodb');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
require('dotenv').config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI, options);

const updateActivity = async (req, res) => {
  const { email, tripId, id, content, title, duration, activity, cost } =
    req.body;
  console.log(req.body);
  try {
    await client.connect();
    const db = client.db('FinalProject');

    const update = await db.collection('CreateTrip').updateOne(
      { _id: tripId },
      {
        $set: {
          [`tasks.${id}`]: { id, content, title, duration, activity, cost },
        },
      }
    );
    const boardObj = await db.collection('CreateTrip').findOne({ _id: tripId });
    const mapBoardData = (boardObj) => {
      const mappedData = boardObj.columnOrder.map((columnId, index) => {
        //columnId
        const column = boardObj.columns[columnId];
        //array of task objects
        const tasks = column.taskIds.map((taskId) => boardObj.tasks[taskId]);
        return tasks;
      });
      return mappedData.slice(1);
    };
    const arrayOfDays = mapBoardData(boardObj);
    // console.log(boardObj);
    if (update.modifiedCount > 0) {
      res.status(200).json({
        status: 200,
        message: 'Data Updated',
        data: { ...boardObj, arrayOfDays },
      });
    } else {
      res.status(400).json({
        status: 400,
        message: 'No changes made',
        data: { ...boardObj, arrayOfDays },
      });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: 'Something went wrong' });
    console.log(err);
    client.close();
  }
};
module.exports = updateActivity;
