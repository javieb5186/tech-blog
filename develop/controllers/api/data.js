const router = require('express').Router();
const { Post, Comment } = require('../../models');
const auth = require('../../utils/auth');
const seedDatabase = require('../../seeds/seed');
require('dotenv').config();

router.get('/seed-database', async (req, res) => {
  try {
    seedDatabase();
    res.redirect('/');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const allPosts = await Post.findAll();
    const posts = allPosts.map((post) => post.get({ plain: true }));
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// Create post
router.post('/post', auth, async (req, res) => {
  try {
    await Post.create({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      author: req.session.username,
      user_id: req.session.user_id,
    });
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create comment
router.post('/comment', auth, async (req, res) => {
  try {
    await Comment.create({
      content: req.body.content,
      author: req.session.username,
      post_id: req.body.postId,
    });
    res.status(200).json({ message: 'Everything okay' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a post by id
router.post('/update/:id', auth, async (req, res) => {
  try {
    const post = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    );
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a post by id
router.delete('/delete/:id', auth, async (req, res) => {
  try {
    await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: 'Post delete' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
