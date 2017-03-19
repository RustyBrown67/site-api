'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _note = require('./note');

var _note2 = _interopRequireDefault(_note);

var _contact = require('./contact');

var _contact2 = _interopRequireDefault(_contact);

var _equipment = require('./equipment');

var _equipment2 = _interopRequireDefault(_equipment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
//import relationship from 'mongoose-relationship';


var SiteSchema = new Schema({
  sitetype: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  network: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: false
  },
  geometry: {
    type: { type: String, default: 'Point' },
    coordinates: {
      "lat": Number,
      "long": Number
    }
  },
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
  contacts: [{ type: Schema.Types.ObjectId, ref: 'Contact' }],
  equipments: [{ type: Schema.Types.ObjectId, ref: 'Equipment' }]
});

module.exports = _mongoose2.default.model('Site', SiteSchema);
//# sourceMappingURL=site.js.map