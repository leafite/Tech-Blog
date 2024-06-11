const Post = require('../models/post');
const User = require('../models/user');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ include: User });
    res.render('homepage', { posts });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving posts');
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, { include: User });
    res.render('post', { post });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving post');
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.create({
      title,
      content,
      UserId: req.session.userId
    });
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating post');
  }
};

exports.deletePost = async (req, res) => {
  try {
    await Post.destroy({ where: { id: req.params.id } });
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting post');
  }
};
