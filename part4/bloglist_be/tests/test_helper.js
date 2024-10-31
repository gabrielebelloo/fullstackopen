const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: "blog 1",
    author: "Gabriele",
    url: "url",
    likes: 3
  },
  {
    title: "blog 2",
    author: "Salvatore",
    url: "url",
    likes: 1
  }
];

const nonExistingId = async () => {
  const blog = new Blog({ 
    title: 'Blog to remove',s
   });
  await blog.save();
  await blog.deleteOne();
  return blog._id.toString();
};

const getBlogs = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

module.exports = {
  initialBlogs, nonExistingId, getBlogs
};