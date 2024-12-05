const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3
  },
  passwordHash: {
    type: String,
    required: true
  },
  name: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
});

userSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
    delete obj.passwordHash;
  }
});

module.exports = mongoose.model("User", userSchema);