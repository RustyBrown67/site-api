import mongoose from 'mongoose';
import Site from './site';
let Schema = mongoose.Schema;

let NoteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: Date,
  text: String,
  site: {
    type: Schema.Types.ObjectId,
    ref: 'Site',
    required: true
  }
});

module.exports = mongoose.model('Note', NoteSchema);
