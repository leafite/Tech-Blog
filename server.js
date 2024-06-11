const express = require('express');
const session = require('express-session');
const Sequelize = require('sequelize');
const path = require('path');
const userController = require('./controllers/userController');
const postController = require('./controllers/postController');
const commentController = require('./controllers/commentController');

const app = express();
const PORT = process.env.PORT || 3000;

// Database configuration
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
});

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Define routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', userController.login);

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.post('/signup', userController.signup);

app.get('/logout', userController.logout);

// Define other routes for posts and comments
app.get('/posts', postController.getAllPosts);
app.get('/posts/:id', postController.getPostById);
app.post('/posts', postController.createPost);
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id', postController.deletePost);

app.get('/posts/:postId/comments', commentController.getCommentsByPostId);
app.post('/posts/:postId/comments', commentController.createComment);
app.put('/comments/:id', commentController.updateComment);
app.delete('/comments/:id', commentController.deleteComment);

sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
