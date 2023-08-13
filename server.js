const path = require('path');
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./develop/controllers');
const helpers = require('./develop/utils/helpers');
const { User, Post, Comment } = require('./develop/models');

const sequelize = require('./develop/config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
  secret: process.env.SECRET,
  cookie: {
    maxAge: 600000, // expires after 10 minutes
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './develop/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/develop/public')));

app.use(routes);

(async function run() {
  await User.sync({ force: false });
  await Post.sync({ force: false });
  await Comment.sync({ force: false });
  app.listen(PORT, () => console.log('Now listening'));
})();

// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// });


