const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models/index');
const userData = require('./users.json');
const postData = require('./posts.json');

const seedDatabase = async () => {
  await User.sync({ alter: true });
  await Post.sync({ alter: true });
  await Comment.sync({ alter: true });

  // In order to create things in order, calling a create on each user is necessary
  for (let i = 0; i < userData.length; i += 1) {
    await User.create(userData[i]);
  }
  await Post.bulkCreate(postData);
};

module.exports = seedDatabase;
