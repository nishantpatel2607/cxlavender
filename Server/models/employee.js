var { mongoose } = require('../database/cxdb');

var Employee = mongoose.model('Employee',{
  firstname: { type: String },
  lastname: { type: String },
  age: { type: Number },
  email: { type: String },
  company: { type: String },
});
module.exports = {Employee} 