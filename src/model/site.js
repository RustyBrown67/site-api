import mongoose from 'mongoose';
import Note from './note';
import Contact from './contact';
import Equipment from './equipment';
let Schema = mongoose.Schema;

let SiteSchema = new Schema({
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
  notes: [{type: Schema.Types.ObjectId, ref: 'Note'}],
  contacts: [{type: Schema.Types.ObjectId, ref: 'Contact'}],
  equipments: [{type: Schema.Types.ObjectId, ref: 'Equipment'}]
});

module.exports = mongoose.model('Site', SiteSchema);
