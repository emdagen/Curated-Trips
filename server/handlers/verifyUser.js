const { MongoClient } = require('mongodb');

require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Verifies if user exists, else it creates a new user //

const verifyUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db('FinalProject');
    const collection = db.collection('user');
    const { email } = req.body;
    let user = await collection.findOne({ email });

    if (user === null) {
      user = await collection.insertOne({ ...req.body, _id: uuidv4() });
      console.log(user.insertedId);

      user = await collection.findOne({ _id: user.insertedId });

      res.status(201).json({
        status: 201,
        message: 'User has been created',
        data: user,
      });
    } else {
      res.status(400).json({
        status: 400,
        message: 'User already has an account',
        data: user,
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

module.exports = verifyUser;
