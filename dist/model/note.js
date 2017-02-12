'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _site = require('./site');

var _site2 = _interopRequireDefault(_site);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var NoteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: String,
  site: {
    type: Schema.Types.ObjectId,
    ref: 'Site',
    required: true
  }
});

module.exports = _mongoose2.default.model('Note', NoteSchema);
//# sourceMappingURL=note.js.map