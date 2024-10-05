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
    })
});

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    Person.findById(id).then(foundPerson => {
        if (foundPerson) {
            response.json(foundPerson);
        } else {
            response.status(404).end();
        }
    });
});

app.post('/api/persons', (request, response) => {
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

    Person.findOne({name: body.name}).then(personFound => {
        if (personFound) {
            return response.status(400).json({ 
                error: 'name must be unique' 
            })
        } else {
            const person = new Person({
                name: body.name,
                number: body.number,
            });
        
            person.save().then(createdPerson => {
                response.json(createdPerson);
            });
        }
    });
});

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    persons = persons.filter(person => person.id !== id);
    response.status(204).end();
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
                   <p>${new Date()}</p>`)
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});