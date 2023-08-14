const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models/index');
const userData = require('./users.json');
const postData = require('./posts.json');

const seedDatabase = async () => {
  await User.sync({ force: true });
  await Post.sync({ force: true });
  await Comment.sync({ force: true });

  for (let i = 0; i < userData.length; i++) {
    await User.create(userData[i]);
  }
  
  await Post.bulkCreate(postData);

  process.exit(0);
};

seedDatabase();
