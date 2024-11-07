const { test, after, beforeEach } = require('node:test');
const Blog = require('../models/blog');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const assert = require('node:assert')
const helper = require('./test_helper')

const api = supertest(app);


beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs');
  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test('the first blog author is Gabriele', async () => {
  const response = await api.get('/api/blogs');
  const contents = response.body.map(e => e.author);
  assert(contents.includes('Gabriele'));
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "blog 3",
    author: "Giuseppe",
    url: "url",
    likes: 0
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogs = await helper.getBlogs();
  const contents = blogs.map(b => b.title);

  assert.strictEqual(blogs.length, helper.initialBlogs.length + 1);

  assert(contents.includes('blog 3'));
});

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'Gaetano',
    url: 'url',
    likes: 2
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);

  const blogs = await helper.getBlogs();

  assert.strictEqual(blogs.length, helper.initialBlogs.length);
});

test('blog unique identifier property is named id', async () => {
  const response = await api.get('/api/blogs');
  const blog_keys = Object.keys(response.body[0]);
  assert(blog_keys.includes('id'));
});

test('blog without likes property gets 0 as default', async () => {
  const newBlog = {
    title: 'Giadina',
    author: 'Giada',
    url: 'url'
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const blogs = await helper.getBlogs();
  const blogs_likes = blogs.map(b => b.likes);

  assert.strictEqual(blogs_likes[helper.initialBlogs.length], 0);
});

after(async () => {
  await mongoose.connection.close();
});