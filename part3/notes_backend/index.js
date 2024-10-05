const express = require('express');
const cors = require('cors');
require('dotenv').config();

const Note = require('./models/note');

const app = express();
app.use(cors());
app.use(express.static('dist'))
app.use(express.json());

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
})

app.post('/api/notes', (request, response) => {
  const body = request.body;
  
  if (!body.content) {
      return response.status(400).json({
          error: 'content missing'
      })
  }

  const note = new Note({
      content: body.content,
      important: Boolean(body.important) || false
  });

  note.save().then(savedNote => {
    response.json(savedNote);
  });
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(result => {
    response.json(result);
  });
});

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id;
  Note.findById(id).then(note => {
    response.json(note);
  });
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id;
  notes = notes.filter(note => note.id !== id);
  
  response.status(204).end();
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});