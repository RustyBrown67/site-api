import mongoose from 'mongoose';
import Site from './site';
let Schema = mongoose.Schema;

let ContactSchema = new Schema({
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

module.exports = mongoose.model('Contact', ContactSchema);
