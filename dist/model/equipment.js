'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _site = require('./site');

var _site2 = _interopRequireDefault(_site);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var EquipSchema = new Schema({
  equipment: {
    type: String,
    required: true
  },
  company: String,
  contactname: String,
  contactpos: String,
  contacttelm: String,
  contacttelo: String,
  contactemail: String,
  text: String,
  site: {
    type: Schema.Types.ObjectId,
    ref: 'Site',
    required: true
  }
});

module.exports = _mongoose2.default.model('Equipment', EquipSchema);
//# sourceMappingURL=equipment.js.map