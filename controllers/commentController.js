const Comment = require('../models/comment');
const User = require('../models/user');

exports.createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const comment = await Comment.create({
      content,
      PostId: req.params.postId,
      UserId: req.session.userId
    });
    res.redirect(`/post/${req.params.postId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating comment');
  }
};
