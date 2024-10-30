const notesRouter = require("express").Router();
const Note = require("../models/note");


notesRouter.post("/", async (request, response, next) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: Boolean(body.important) || false,
  });

  const savedNote = await note.save()
  response.status(201).json(savedNote)
});

notesRouter.get("/", async(request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

notesRouter.get(":id", (request, response, next) => {
  const id = request.params.id;
  Note.findById(id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((err) => next(err));
});

notesRouter.delete(":id", (request, response, next) => {
  const id = request.params.id;
  Note.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end();
    })
    .catch((err) => next(err));
});

notesRouter.put(":id", (request, response, next) => {
  const id = request.params.id;
  const { content, important } = request.body;

  Note.findByIdAndUpdate(
    id,
    { content, important },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((err) => next(err));
});

module.exports = notesRouter;
