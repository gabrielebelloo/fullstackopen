const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(express.static('dist'));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'));
morgan.token('content', (req, res) => {
    return JSON.stringify(req.body);
})

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons);
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const selectedPerson = persons.find(person => person.id === id);

    if (selectedPerson) {
        response.json(selectedPerson)
    } else {
        response.status(404).end()
    }
})

const generateId = () => {
    const ids = persons.map(person => Number(person.id));
    let randomId = Math.floor(Math.random() * 1000000000);
    while (ids.includes(randomId)) {
        randomId = Math.floor(Math.random() * 1000000000);
    }
    return String(randomId);
}

app.post('/api/persons', (request, response) => {
    const body = request.body;

    const found = persons.find(person => person.name === body.name);

    if (found) {
        return response.status(400).json({ 
            error: 'name must be unique' 
        })
    }
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
        id: generateId()
    }

    persons = persons.concat(person);
    
    response.json(person);
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    persons = persons.filter(person => person.id !== id);
    response.status(204).end();
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
                   <p>${new Date()}</p>`)
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});