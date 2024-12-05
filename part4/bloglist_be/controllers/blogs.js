const blogsRouter = require("express").Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate('user');
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const users = await User.find({});

  const user = users[0].id;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user
  });

  console.log(blog);
  
  try {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch(exception) {
    response.status(400).send();
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  await Blog.findByIdAndDelete(id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const body = request.body;
  updatedBlog = await Blog.findByIdAndUpdate(id, body, {new: true});
  response.status(200).json(updatedBlog);
});

module.exports = blogsRouter;