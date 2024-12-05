const bcrypt = require('bcryptjs');
const usersRouter = require("express").Router();
const User = require('../models/user');

usersRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, password, name } = request.body;

  if (username.length > 2 && password.length > 2) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      name,
      passwordHash: passwordHash
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } else {
    response.status(400).json({ error: 'invalid user'});
  }
  
})

module.exports = usersRouter;