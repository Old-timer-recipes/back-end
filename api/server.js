const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const restrict = require('./middlewares/restricted');

const authRouter = require('./auth/auth-router.js');
const recipesRouter = require('./recipes/recipes-router.js');
const usersrouter = require('./users/users-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', usersrouter);
server.use('/api/recipes', recipesRouter); // only logged-in users should have access!
server.get('/', (req, res) => {
  res.status(200).json('Up');
});
server.get('*', (req, res) => {
  res.status(404).json('Not Found');
});

module.exports = server;
