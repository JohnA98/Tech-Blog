const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const post = await Post.create({ ...req.body, userId: req.session.userId })
    res.json(post)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatePost = await Post.update(req.body, {
      where: {
        id: req.params.id
      }
    })

    if (updatePost) {
      res.json(updatePost);
    } else {
      res.status(404).json(err);
    }
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletePost = await Post.destroy({
      where: {
        id: req.params.id
      }
    })

    if (deletePost) {
      res.status(200).json({ message: "Post deleted succesfully" })
    } else {
      res.status(404).json({ message: "Could not find post" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
