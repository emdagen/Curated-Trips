const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const port = 8000;
// const createNewTrip = require('./handlers/createNewTrip');
const verifyUser = require('./handlers/verifyUser');
const createBoard = require('./handlers/createBoard');
const updateBoard = require('./handlers/updateBoard');
const completeBoard = require('./handlers/completeBoard');
const getTripDetails = require('./handlers/getTripDetails');
const getCurrentTrips = require('./handlers/getCurrentTrip');
const uploadImage = require('./handlers/uploadImage');
const updateActivity = require('./handlers/updateActivity');
const getPastTrips = require('./handlers/getPastTrips');
const addCommentHandler = require('./handlers/addCommentHandler');
const removeComment = require('./handlers/removeComment');

express()
  //allows server to auto parse the req.body

  .use(express.json())
  .use(helmet())
  .use(morgan('tiny'))

  //POST
  .post('/api/add-comment', addCommentHandler)
  .post('/api/uploadImage', uploadImage)
  .post('/api/verify-user', verifyUser)
  .post('/api/create-board', createBoard)
  //PATCH
  .patch('/api/remove-comment', removeComment)
  .patch('/api/update-activity', updateActivity)
  .patch('/api/update-board', updateBoard)
  .patch('/api/complete-board', completeBoard)
  //GET
  .get('/api/detail/:_id', getTripDetails)
  .get('/api/currentTrips/:_id', getCurrentTrips)
  .get('/api/pastTrips/:_id', getPastTrips)

  .listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
