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

module.exports = {
  dummy,
  totalLikes,
};
