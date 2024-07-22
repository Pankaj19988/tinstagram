require('dotenv').config();

const express = require('express');
const path = require('path');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const likeRoutes = require('./routes/likes');
const usersRoutes = require('./routes/users')
const followRoutes = require('./routes/follows');
var cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/likes', likeRoutes);
app.use('/follows', followRoutes);
app.use('/users', usersRoutes);

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

sequelize.sync().then(() => {
  app.listen(PORT,HOST, () => {
    console.log('Server started on port '+ `${HOST}:${PORT}`);
  });
});
