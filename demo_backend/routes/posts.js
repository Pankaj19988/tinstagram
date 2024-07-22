const express = require('express')
const { Post, Image, User, Like } = require('../config/associations')
const auth = require('../middleware/auth')
const upload = require('../middleware/upload')

const router = express.Router()

// Create a new post with images
router.post('/', auth, upload.array('images', 10), async (req, res) => {
  const { title, description } = req.body

  let missingFields = []
  if (!title) missingFields.push('title')
  if (!description) missingFields.push('description')
  if (!req.files.length || req.files.length.length === 0)
    missingFields.push('images')

  if (missingFields.length > 0) {
    return res.status(400).json({ message: `${missingFields.join(', ')}` })
  }

  const post = await Post.create({
    title,
    description,
    userId: req.user.id
  })

  const imageFiles = req.files
  for (let file of imageFiles) {
    await Image.create({ url: `/uploads/${file.filename}`, postId: post.id })
  }

  res.status(201).json(post)
})

// Get all posts with images
router.get('/', auth, async (req, res) => {
  const posts = await Post.findAll({
    include: [
      { model: Image, as: 'images' },
      {
        model: Like,
        as: 'likes'
      },
      { model: User, as: 'owner' }
    ],
    order: [['createdAt', 'DESC']] // Sort by createdAt in descending order
  })
  res.json(posts)
})

// Get user posts with images
router.get('/me', auth, async (req, res) => {
  let filter = {}
  filter.userId = req.user.id
  const posts = await Post.findAll({
    where: filter,
    include: [
      { model: Image, as: 'images' },
      {
        model: Like,
        as: 'likes'
      },
      { model: User, as: 'owner' }
    ],
    order: [['createdAt', 'DESC']] // Sort by createdAt in descending order
  })
  res.json(posts)
})

// Get user posts with images
router.get('/user/:userId', auth, async (req, res) => {
  let filter = {}
  filter.userId = req.params.userId
  const posts = await Post.findAll({
    where: filter,
    include: [
      { model: Image, as: 'images' },
      {
        model: Like,
        as: 'likes'
      },
      { model: User, as: 'owner' }
    ],
    order: [['createdAt', 'DESC']] // Sort by createdAt in descending order
  })
  res.json(posts)
})

// Get user posts with images
router.get('/:postId', auth, async (req, res) => {
  let filter = {}
  filter.postId = req.params.postId
  const post = await Post.findOne({
    where: filter,
    include: [
      { model: Image, as: 'images' },
      {
        model: Like,
        as: 'likes'
      },
      { model: User, as: 'owner' }
    ],
    order: [['createdAt', 'DESC']] // Sort by createdAt in descending order
  })
  res.json(post)
})

module.exports = router
