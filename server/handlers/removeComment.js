const { v4: uuidv4 } = require('uuid');

const { MongoClient } = require('mongodb');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
require('dotenv').config();
const { MONGO_URI } = process.env;

//PATCH removes comment
const removeComment = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  // console.log(req.body);

  const { columnId, tripId, id } = req.body;
  await client.connect();
  const db = client.db('FinalProject');

  const comments = await db
    .collection('CreateTrip')
    .updateOne(
      { _id: tripId },
      { $pull: { [`comments.${columnId}`]: { id } } }
    );
  // console.log(comments);
  const trip = await db.collection('CreateTrip').findOne({ _id: tripId });
  // console.log(trip.comments[columnId]);
  if (trip) {
    res.status(200).json({
      status: 200,
      message: 'Comment removed',
      data: trip.comments,
    });
  } else {
    res.status(400).json({
      status: 400,
      message: 'Unable to find trip',
      data: trip.comments,
    });
  }
  client.close();
};

module.exports = removeComment;
