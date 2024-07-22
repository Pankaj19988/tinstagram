const User = require('../models/User');
const Post = require('../models/Post');
const Image = require('../models/Image');
const Follow = require('../models/Follow');
const Like = require('../models/Like');

// Define associations

// Users
User.hasMany(Post, { foreignKey: 'userId' });


// Likers users association
Like.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Like.belongsTo(Post, { foreignKey: 'postId' });

// Posts
Post.belongsTo(User, { foreignKey: 'userId', as: 'owner' });
Post.hasMany(Like, { foreignKey: 'postId', as: 'likes' });
Post.hasMany(Image, { foreignKey: 'postId', as: 'images' });

// Image post association
Image.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

// follows association
User.belongsToMany(User, { as: 'Followers', through: Follow, foreignKey: 'followerId' });
User.belongsToMany(User, { as: 'Followings', through: Follow, foreignKey: 'followingId' });

User.hasMany(Follow, { foreignKey: 'followingId', as: 'followers' }); // User has many Follows (following)
User.hasMany(Follow, { foreignKey: 'followerId', as: 'following' });   // User has many Follows (followers)


module.exports = { User, Post, Image, Follow, Like };
