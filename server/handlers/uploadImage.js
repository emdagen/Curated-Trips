const { v4: uuidv4 } = require('uuid');

const { MongoClient } = require('mongodb');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
require('dotenv').config();
const { MONGO_URI } = process.env;

// sends the image url to mongodb. Creates an images array.
const uploadImage = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { _id, image } = req.body;
  console.log(req.body);
  try {
    await client.connect();
    const db = client.db('FinalProject');
    const tripPlan = await db
      .collection('CreateTrip')
      .updateOne({ _id }, { $push: { images: image } }, { upsert: true });
    const imageArray = await db.collection('CreateTrip').findOne({ _id });
    console.log(tripPlan);
    res.status(200).json({ status: 200, data: imageArray.images });
  } catch (err) {
    console.error('Something went wrong', err);
  }
};

module.exports = uploadImage;
