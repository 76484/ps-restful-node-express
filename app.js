const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

const app = express();
const port = process.env.PORT || 3000;

if (process.env.ENV === 'Test') {
  console.log('This is a test');
  mongoose.connect('mongodb://localhost/bookAPI_Test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} else {
  console.log('this is for real');
  mongoose.connect('mongodb://localhost/bookAPI', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
