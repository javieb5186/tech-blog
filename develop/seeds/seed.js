const sequelize = require('../config/connection');
const { User } = require('../models/index');
const userData = require('./users.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData);

  process.exit(0);
};

seedDatabase();
