const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile} = require('../helpers/fsUtils');

notes.get('/', (req, res) =>
readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)))
);

notes.post('/', (req, res) => {
  
  const { text, title } = req.body;
 

  
  if (title && text) {
  
    const newNote = {
     title,
     text,
     note_id: uuidv4(),
    };

    readAndAppend(newNote, './db/notes.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting note');
  }
});


 


module.exports = notes;