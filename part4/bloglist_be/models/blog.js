const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set('toJSON', {
    transform: (document, obj) => {
        obj.id = obj._id.toString();
        delete obj._id;
        delete obj.__v;
    }
})

module.exports =  mongoose.model("Blog", blogSchema);