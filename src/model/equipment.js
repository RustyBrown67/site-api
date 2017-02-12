import mongoose from 'mongoose';
import Site from './site';
let Schema = mongoose.Schema;

let EquipSchema = new Schema({
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

module.exports = mongoose.model('Equipment', EquipSchema);
