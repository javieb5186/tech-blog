const router = require('express').Router();
const Post = require('../models/Post');

router.get('/', async (req, res) => {
  try {
    const allPosts = await Post.findAll();
    const posts = allPosts.map(post => post.get({ plain: true }));
    console.log({ posts });
    res.render('homepage', { posts });
  } catch (err) {
    res.status(500).json({ message: err });
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
