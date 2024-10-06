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

app.post('/api/notes', (request, response, next) => {
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

  note.save()
    .then(savedNote => {
      response.json(savedNote);
    })
    .catch(err => next(err));
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
  const { content, important } = request.body;

  Note.findByIdAndUpdate(id, { content, important } , {new: true, runValidators: true, context: 'query'})
    .then(updatedNote => {
      response.json(updatedNote);
    })
    .catch(err => next(err));
});

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (err.name === 'ValidationError') {
    return res.status(400).send({ error: err.message});
  }

  next(err);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});