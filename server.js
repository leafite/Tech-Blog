const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const userController = require('./controllers/userController');
const postController = require('./controllers/postController');
const commentController = require('./controllers/commentController');

const app = express();
const PORT = process.env.PORT || 3000;

const sequelize = new Sequelize(process.env.DATABASE_URL);
const sessionStore = new SequelizeStore({ db: sequelize });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));

// Define routes
app.post('/signup', userController.signup);
app.post('/login', userController.login);
app.get('/logout', userController.logout);

// Define other routes for posts and comments

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
