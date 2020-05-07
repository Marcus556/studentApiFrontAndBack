const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/keys').mongoURI;

const students = require('./routes/api/students');

const app = express();

//body-parserns middleware
app.use(bodyParser.json());

//connect to database
mongoose
  .connect(db)
  .then(() => console.log('connected to database...'))
  .catch(err => console.log(err));

// user routes 
app.use('/api/students', students);

//port
const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server started on ${port}`));