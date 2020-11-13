let express = require('express'),
  path = require('path'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  createError = require('http-errors');


const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const routes = require('../Server/routes');
app.use('/api', routes);

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
