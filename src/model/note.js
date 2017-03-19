import mongoose from 'mongoose';
import Site from './site';
//let relationship = require('mongoose-relationship');
//import relationship from 'mongoose-relationship';
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

//NoteSchema.plugin(relationship, { relationshipPathName: "site" });
module.exports = mongoose.model('Note', NoteSchema);
