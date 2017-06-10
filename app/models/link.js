var db = require('../config');
var crypto = require('crypto');

var LinkSchema = db.Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: { type: Number, default: 0 }
}, { 
  timestamps: true 
});

LinkSchema.pre('save', function(next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
});

var Link = db.model('Url', LinkSchema);

module.exports = Link;
