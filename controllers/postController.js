// Import the Post model
const Post = require('../models/post');

// Controller functions for handling posts
const postController = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.findAll();
      res.json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getPostById: async (req, res) => {
    const postId = req.params.id;
    try {
      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      console.error('Error fetching post by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  createPost: async (req, res) => {
    const { title, content } = req.body;
    try {
      const newPost = await Post.create({ title, content });
      res.status(201).json(newPost);
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  updatePost: async (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body;
    try {
      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      post.title = title;
      post.content = content;
      await post.save();
      res.json(post);
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  deletePost: async (req, res) => {
    const postId = req.params.id;
    try {
      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      await post.destroy();
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = postController;
