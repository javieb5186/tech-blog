const sequelize = require('../config/connection');
const { User, Post } = require('../models/index');
const userData = require('./users.json');
const postsData = require('./posts.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData);
  await Post.bulkCreate(postsData);

  process.exit(0);
};

seedDatabase();
