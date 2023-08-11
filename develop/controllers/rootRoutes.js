const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');
const auth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const allPosts = await Post.findAll();
    const posts = allPosts.map(post => post.get({ plain: true }));
    res.render('homepage', { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post('/login', async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.status(200).json({message: 'Already logged in'});
    } 
    else if (!req.session.loggedIn) {
      const user = await User.findOne({
        where: { username: req.body.username }
      });
      if (user) {
        const validUserPassword = await user.checkPassword(req.body.password);
  
        if (validUserPassword) {
          req.session.save(() => {
            req.session.loggedIn = true;
            req.session.username = user.username;
            res.redirect('/');
          });
        } else {
          res.status(200).json({ message: 'Incorrect password' });
        }
      }
      else if (!user) {
        res.status(200).json({ message: 'No username exists' });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/logout', async (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(200).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post('/signup', async (req, res) => {
  try {
    const user = await User.findOne( {
      where: { username: req.body.username }
    });

    if (!user) {
      const newUser = await User.create({
        username: req.body.username,
        password: req.body.password,
      });
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.username = newUser.username;
        res.redirect('/');
      });
    } else if (user){
      res.status(200).json({ message: 'User already exists'});
    } else {
      res.status(200).json({ message: 'An error occured'});
    }
  } catch (err) {
    res.status(500).json(err); 
  }
});

router.get('/newpost', async (req, res) => {
  try {
    res.render('newPost');
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
