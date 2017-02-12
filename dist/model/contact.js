'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _site = require('./site');

var _site2 = _interopRequireDefault(_site);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var ContactSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  telmobile: String,
  email: String,
  teloffice: String,
  position: String,
  site: {
    type: Schema.Types.ObjectId,
    ref: 'Site',
    required: true
  }
});

module.exports = _mongoose2.default.model('Contact', ContactSchema);
//# sourceMappingURL=contact.js.map