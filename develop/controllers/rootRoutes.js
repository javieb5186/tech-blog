const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const auth = require('../utils/auth');

// Get all posts for homepage
router.get('/', async (req, res) => {
  try {
    const allPosts = await Post.findAll();
    const posts = allPosts.map((post) => post.get({ plain: true }));
    res.render('homepage', { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// Get posts by category
router.get('/category/:category', async (req, res) => {
  try {
    const allPosts = await Post.findAll({
      where: { category: req.params.category },
    });
    const posts = allPosts.map((post) => post.get({ plain: true }));
    res.render('homepage', { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.status(200).json(
        {
          message: 'Already logged in',
        },
      );
    } else if (!req.session.loggedIn) {
      const user = await User.findOne({
        where: { username: req.body.username },
      });
      if (user) {
        const validUserPassword = await user.checkPassword(req.body.password);

        if (validUserPassword) {
          req.session.save(() => {
            req.session.user_id = user.id;
            req.session.loggedIn = true;
            req.session.username = user.username;
            res.redirect('/');
          });
        } else {
          res.status(200).json({ message: 'Incorrect password' });
        }
      } else if (!user) {
        res.status(200).json({ message: 'No username exists' });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Logout
router.get('/logout', auth, async (req, res) => {
  try {
    req.session.destroy(() => {
      res.status(200).end();
    });
  } catch (error) {
    res.status(404).end();
  }
});

// Signup if a user already exists
router.post('/signup', async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username },
    });

    if (!user) {
      const newUser = await User.create({
        username: req.body.username,
        password: req.body.password,
      });
      req.session.save(() => {
        req.session.user_id = newUser.id;
        req.session.loggedIn = true;
        req.session.username = newUser.username;
        res.redirect('/');
      });
    } else if (user) {
      res.status(200).json({ message: 'User already exists' });
    } else {
      res.status(200).json({ message: 'An error occured' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Go to user dashboard and send all related user posts
router.get('/dashboard', auth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [{ model: Post }],
      attributes: ['username'],
    });
    const user = userData.get({ plain: true });
    res.render('dashboard', { user, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/newpost', auth, async (req, res) => {
  try {
    res.render('newPost', { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// Get a single post by id
router.get('/post/:id', auth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: Comment }],
    });
    const post = postData.get({ plain: true });
    res.render('post', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a post by id
router.get('/updatepost/:id', auth, async (req, res) => {
  try {
    res.render('updatePost', { postId: req.params.id, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
