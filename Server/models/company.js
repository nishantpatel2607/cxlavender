var { mongoose } = require('../database/cxdb');
var Company = mongoose.model('Company', {
  companyname: { type: String },
  size: { type: String },
  location: { type: String },
});
module.exports = { Company };
