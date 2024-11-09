const { test, describe, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const helper = require('./test_helper');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);


describe('when there is initially one user in db', () => {
  beforeEach(async () => {  
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('creation succeds with a fresh username', async () => {
    const userAtStart = await helper.usersInDb();

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, userAtStart.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    assert(usernames.includes(newUser.username));
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const userAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen'
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert(result.body.error.includes('expected username to be unique'));

    assert.strictEqual(usersAtEnd.length, userAtStart.length);
  });
});

after(async () => {
  await mongoose.connection.close()
});