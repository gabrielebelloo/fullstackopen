const blog = require("../models/blog");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let totalLikes = 0;
  if (blogs) {
    blogs.forEach((blog) => {
      totalLikes += blog.likes;
    });
  }
  return totalLikes;
};
 
const favoriteBlog = (blogs) => {
  mostLikedBlog = null;
  if (blogs.length > 0) {
    blogs.forEach(blog => {
      if (mostLikedBlog === null || blog.likes > mostLikedBlog.likes) {
        mostLikedBlog = blog;
      }
    });
    delete mostLikedBlog._id;
    delete mostLikedBlog.url;
    delete mostLikedBlog.__v;
  }
  return mostLikedBlog;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
