
var { mongoose } = require('../database/cxdb');
var Company = mongoose.model('Company', {
  companyname: { type: String },
  size: { type: String },
  age: { type: Number },
  location: { type: String }
});
module.exports = { Company }; 