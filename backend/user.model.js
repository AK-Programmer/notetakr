const mongoose = require('mongoose'); 
const moment = require('moment');
const Schema = mongoose.Schema; 

let NotesSchema = new Schema ({
    date_modified: {type: String},
    note_title: {type: String, default: "Untitled"},
    note_body: {type: String, default: "Write your next novel here!"}
})

module.exports = mongoose.model('Note', NotesSchema);