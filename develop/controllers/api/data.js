const router = require('express').Router();
const Post = require('../../models/Post');
require('dotenv').config();

router.get('/', async (req, res) => {
  try {
    const allPosts = await Post.findAll();
    const posts = allPosts.map(post => post.get({ plain: true }));
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post('/post', async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      author: req.body.user,
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
