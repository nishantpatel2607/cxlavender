const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const createError = require('http-errors');

var app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());

const routes = require('./routes/emplroutes');
const companyroutes = require('./routes/companyroutes');

// const routes = require('./routes/emplroutes');
app.use('/api/empl', routes);
// const companyroutes = require('./routes/emplroutes');
app.use('/api/company', companyroutes);

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Started up at port ' + port);
});

app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});
