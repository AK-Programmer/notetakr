const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser');
const cors = require('cors');
const moment = require('moment');
const mongoose = require('mongoose');
const noteRoutes = express.Router();
const PORT = 4000; 


let Note = require('./user.model'); 

app.use(cors()); 
app.use(bodyParser.json()); 


mongoose.connect('mongodb://127.0.0.1:27017/notes', {useNewUrlParser: true}); 
const connection = mongoose.connection; 

connection.once('open', function () {
    console.log("MongoDB database connection established successfully"); 
})

//Get all notes
noteRoutes.route('/').get(function(req, res) {
    Note.find(function(err, notes) {
        if (err) {
            console.log(err);
        } else {
            res.json(notes); 
        }
    });
});

//Get one note
noteRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id; 
    Note.findById(id, function(err, note) {
        res.json(note); 
    });
});

//Update note
noteRoutes.route('/update/:id').put(function(req, res) {
    console.log("Update note is running in backend");
    Note.findById(req.body._id, function(err, note) {
        if(!note) {
            res.status(404).send("Data not found"); 
        } else {
            note.date_modified = moment().format('dddd MMMM D, YYYY');
            note.note_title = req.body.note_title; 
            note.note_body = req.body.note_body; 

            note.save().then(note => {
                res.json('Note updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible"); 
            });
        }
    });
});

//Create note
noteRoutes.route('/add').post(function(req, res) {
    let note = new Note(); 
    note.date_modified = moment().format('dddd MMMM D, YYYY');
    note.save()
        .then(note => {
            res.status(200).json(note)            
        })
        .catch(err => {
            res.status(400).send('adding new todo failed'); 
        });
});

//Delete note
noteRoutes.route('/delete/:id').delete(function(req, res) {
    Note.deleteOne({_id: req.params.id}, err=>console.log(err))
        .then(() => {
            res.status(200).json("Note successfully deleted!");
        })
        .catch(err => {
            res.status(400).send("Deletion failed")
        });
})

app.use('/notes', noteRoutes)
app.listen(PORT, function (){
    console.log("Server is running on Port: " + PORT); 
})