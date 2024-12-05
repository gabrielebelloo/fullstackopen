const blogsRouter = require("express").Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate('user');
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  });

  console.log(blog);
  
  try {
    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch(exception) {
    console.log(exception)
    response.status(400).send();
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' });
  }

  const blog = await Blog.findById(id);

  if (!blog) {
    return response.status(401).json({ error: 'invalid id' });
  }

  if (blog.user.toString() === decodedToken.id) {
    await blog.deleteOne();
    response.status(204).end();
  } else {
    return response.status(401).json({ error: 'unauthorized' });
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const body = request.body;
  updatedBlog = await Blog.findByIdAndUpdate(id, body, {new: true});
  response.status(200).json(updatedBlog);
});

module.exports = blogsRouter;