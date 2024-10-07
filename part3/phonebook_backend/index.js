require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person');
const app = express();

app.use(express.json());
app.use(express.static('dist'));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'));
morgan.token('content', (req, res) => {
    return JSON.stringify(req.body);
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons);
    });
});

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;
    Person.findById(id)
        .then(foundPerson => {
            if (foundPerson) {
                response.json(foundPerson);
            } else {
                response.status(404).end();
            }
        })
        .catch(err => next(err));
});

app.post('/api/persons', (request, response, next) => {
    const body = request.body;

    if (!body.name) {
        return response.status(400).json({ 
            error: 'name missing' 
        })
    }
    if (!body.number) {
        return response.status(400).json({ 
            error: 'number missing' 
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    });

    person.save()
        .then(createdPerson => {
            response.json(createdPerson);
        })
        .catch(err => next(err));
});

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;
    const id = request.params.id;

    if (!body.name) {
        return response.status(400).json({ 
            error: 'name missing' 
        })
    }
    if (!body.number) {
        return response.status(400).json({ 
            error: 'number missing' 
        })
    }

    const person = {
        name: body.name,
        number: body.number,
    };

    Person.findByIdAndUpdate(id, person, { new: true, runValidators: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(err => next(err));
});

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;
    Person.findByIdAndDelete(id)
        .then(res => {
            response.json(res);
        })
        .catch(err => next(err));
})

app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        response.send(`<p>Phonebook has info for ${persons.length} people</p>
            <p>${new Date()}</p>`)
    });
})

const errorHandler = (err, req, res, next) => {
    console.log(err.message);

    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id'});
    }

    next(err)
}

app.use(errorHandler)

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});