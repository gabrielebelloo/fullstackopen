const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('must set password');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://bellogabriele2001:${password}@cluster0.qqljr.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema);


if (process.argv.length < 4) {
    console.log('Phonebook:');
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person);
        });
        mongoose.connection.close();
    })
} else {
    const name = process.argv[3];
    const number = process.argv[4];
    
    const person = new Person({
        name,
        number
    });
    
    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`);
        mongoose.connection.close()
    });
}


