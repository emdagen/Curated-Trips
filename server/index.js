const express = require('express');
const helmet = require('helmet');
// morgan gives more info
const morgan = require('morgan');
const port = 8000;

express()
  //allows server to auto parse the req.body

  .use(express.json())
  .use(helmet())
  .use(morgan('tiny'))

  .get('/hello', (req, res) => {
    res.status(200).json({ status: 200, message: 'Wassup' });
  })

  .listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
