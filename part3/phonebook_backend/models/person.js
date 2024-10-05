const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);

mongoose.connect(url)
    .then(res => {
        console.log('connected to MongoDB');
    })
    .catch(err => {
        console.log('error connecting to MongoDB:', err.message);   
    });

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});

personSchema.set('toJSON', {
    transform: (doc, obj) => {
        obj.id = obj._id.toString();
        delete obj._id;
        delete obj.__v;
    }
})

module.exports = mongoose.model('Person', personSchema);