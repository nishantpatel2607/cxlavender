var express = require('express');
const cxRoute = express.Router();
const { ObjectID } = require('mongodb');
var { Company } = require('../models/company');
const _ = require('lodash');

cxRoute.route('/locations').get(async (req, res) => {
  const result = await Company.find().distinct('location').sort();

  res.send({ result });
});

cxRoute.route('/sizes').get(async (req, res) => {
  const result = await Company.find().distinct('size').sort();

  res.send({ result });
});

cxRoute.route('/list').get(async (req, res) => {
  const result = await Company.find()
    .select('_id companyname')
    .sort('companyname');

  res.send({ result });
});

module.exports = cxRoute;
