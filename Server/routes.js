const express = require('express');
const app = express();
const cxRoute = express.Router();

cxRoute.route('/employees').get((req, res) => {
  res.send('All employees');
});

cxRoute.route('/employee/:id').get((req, res) => {
  res.send('employee ' + req.params.id);
});

cxRoute.route('/employee').post((req, res) => {
  res.send('employee created');
});

cxRoute.route('/employee/:id').put((req, res) => {
  res.send('employee updated' + req.params.id);
});

cxRoute.route('/employee/:id').delete((req, res) => {
  res.send('employee deleted' + req.params.id);
});

module.exports = cxRoute;
