import React, { Component } from 'react'; 
import axios from 'axios'; 
const moment = require('moment');

export default class NotePage extends Component {
    updateNote = () => {

        let updateObj = {
            _id: this.props.note_id,
            note_title: document.getElementById('title').innerText, 
            note_body: document.getElementById('body').innerText,
            date_modified: moment().format('dddd MMMM D, YYYY')

        }

        this.props.updateContextState(updateObj.date_modified, updateObj.note_title, updateObj.note_body);

        axios.put('http://localhost:4000/notes/update/'+updateObj._id, updateObj)
        .then(res=> console.log(res.data))
        .catch(error => console.log(error));
    }

    render () {
        return   (
            <div className="note-page">
                <p className="date">{this.props.date_modified}</p>
                <h1 id='title' contentEditable="true" className="note-title" onKeyDown={this.updateNote}>{this.props.note_title}</h1>
                <div id='body' contentEditable="true" className="note-text" onKeyDown={this.updateNote}>
                    {this.props.note_body}
                </div>
                
            </div>
        )
    }
}