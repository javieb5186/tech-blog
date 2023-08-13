const router = require('express').Router();
const { Post, Comment } = require('../../models');
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
    if (req.session.loggedIn) {
      await Post.create({
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        author: req.session.username,
        user_id: req.session.user_id,
      });
      res.redirect('/dashboard');
    } else {
      res.redirect('/');
    }
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/comment', async (req, res) => {
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

router.post('/update/:id', async (req, res) => {
  try {
    console.log("Update Called");
    const post = await Post.update({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
    }, 
    {
      where: {
        id: req.params.id,
      },
    });
    console.log("Post is: ");
    console.log(post);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
