const { test, after, beforeEach } = require('node:test');
const User = require('../models/user');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const assert = require('node:assert');
const helper = require('./test_helper');
const bcrypt = require('bcryptjs');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  let userObj = new User(helper.initialUsers[0]);
  userObj.passwordHash = await bcrypt.hash(helper.initialUsers[0].password, 10);
  delete userObj.password;
  await userObj.save();
  userObj = new User(helper.initialUsers[1]);
  userObj.passwordHash = await bcrypt.hash(helper.initialUsers[1].password, 10);
  delete userObj.password;
  await userObj.save();
});

test('users are returned', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('there are two users', async () => {
  const response = await api.get('/api/users');
  assert.strictEqual(response.body.length, helper.initialUsers.length);
});

test('a valid blog can be added', async () => {
  const newUser = {
    username: 'user3',
    name: 'user3',
    password: 'password3'
  };

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/users');

  assert.strictEqual(response.body.length, helper.initialUsers.length + 1);
});

test('a invalid blog cannot be added', async () => {
  const newUser = {
    username: '12',
    name: '12',
    password: '12'
  };

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400);

  const response = await api.get('/api/users');
  assert.strictEqual(response.body.length, helper.initialUsers.length);
});

after(async () => {
  await mongoose.connection.close();
});