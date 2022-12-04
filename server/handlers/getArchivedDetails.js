const { MongoClient } = require('mongodb');

require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const client = new MongoClient(MONGO_URI, options);
const getArchivedDetails = async (req, res) => {
  try {
    await client.connect();

    const db = client.db('FinalProject');
    const { _id } = req.params;

    const tripCollection = db.collection('ArchivedTrip');
    const trip = await tripCollection.findOne({ _id });
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
    const arrayOfDays = mapBoardData(trip);
    console.log({ ...trip, arrayOfDays });
    if (trip) {
      res.status(201).json({
        status: 201,
        message: 'We got it!!!',
        data: { ...trip, arrayOfDays },
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "Couldn't find the trip",
        data: { ...trip, arrayOfDays },
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

module.exports = getArchivedDetails;
