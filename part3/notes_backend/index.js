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

app.get('/api/notes/:id', (request, response, next) => {
  const id = request.params.id;
  Note.findById(id)
    .then(note => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch(err => next(err));
})

app.delete('/api/notes/:id', (request, response, next) => {
  const id = request.params.id;
  Note.findByIdAndDelete(id)
    .then(note => {
      response.status(204).end()
    })
    .catch(err => next(err));
});

app.put('/api/notes/:id', (request, response, next) => {
  const id = request.params.id;
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important
  }

  Note.findByIdAndUpdate(id, note, {new: true})
    .then(updatedNote => {
      response.json(updatedNote);
    })
    .catch(err => next(err));
});

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }

  next(err);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});