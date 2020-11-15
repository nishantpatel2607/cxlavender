var express = require('express');
const cxRoute = express.Router();
const { ObjectID } = require('mongodb');
var { Employee } = require('../models/employee');
var { Company } = require('../models/company');
const _ = require('lodash');

//get all employees
cxRoute.route('/list').get(async (req, res) => {
  const { page = 1, location = '', size = '' } = req.query;
  const limit = 10;

  const searchCondition = {};
  if (location !== '') searchCondition.location = location;
  if (size != '') searchCondition.size = size;
  //  console.log(searchCondition);

  const companies = await Company.find(searchCondition).select('_id');
  const cmpary = [];
  companies.forEach((el) => {
    cmpary.push('' + el._id);
  });

  const employees = await Employee.find();

  var result = employees.filter((emp) => cmpary.includes(emp.company));
  const count = result.length;
  result = result.splice((page - 1) * limit, 10);

  res.json({
    result,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  });
});

//get employee
cxRoute.route('/:id').get((req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Employee.findById(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send();
      }
      res.send({ result });
    })
    .catch((e) => {
      res.status(400).send();
    });
});

//create employee
cxRoute.route('/').post((req, res) => {
  var emp = new Employee({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: req.body.age,
    email: req.body.email,
    company: req.body.company,
  });

  emp.save().then(
    (result) => {
      res.send({ result });
    },
    (e) => {
      res.status(400).send(e);
    }
  );
});

//update employee
cxRoute.route('/:id').put((req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  var body = _.pick(req.body, [
    'firstname',
    'lastname',
    'age',
    'email',
    'company',
  ]);
  Employee.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).send();
      }

      res.send({ result });
    })
    .catch((e) => {
      res.status(400).send();
    });
});

//delete employee
cxRoute.route('/:id').delete((req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Employee.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send();
      }

      res.send({ result });
    })
    .catch((e) => {
      res.status(400).send();
    });
});

module.exports = cxRoute;
