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

const mostBlogs = (blogs) => {
  let blogsCount = {};
  blogs.forEach(blog => {
    if (!Object.keys(blogsCount).includes(blog.author)) {
      blogsCount[blog.author] = 1;
    } else {
      blogsCount[blog.author] += 1;
    }
  });

  let mostBlogs = null;
  for (const [key, value] of Object.entries(blogsCount)) {
    if (!mostBlogs || value > mostBlogs.blogs) {
      mostBlogs = {
        author: key,
        blogs: value
      };
    }
  }

  return mostBlogs;
};  

const mostLikes = (blogs) => {
  let blogsLikes = {};
  blogs.forEach(blog => {
    if (!Object.keys(blogsLikes).includes(blog.author)) {
      blogsLikes[blog.author] = blog.likes;
    } else {
      blogsLikes[blog.author] += blog.likes;
    }
  });

  let mostLikes = null;
  for (const [key, value] of Object.entries(blogsLikes)) {
    if (!mostLikes || value > mostLikes.likes) {
      mostLikes = {
        author: key,
        likes: value
      };
    }
  }

  return mostLikes;
};  

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
