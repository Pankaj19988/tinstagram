const express = require('express')
const { Like } = require('../config/associations')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/:postId', auth, async (req, res) => {
  // Check if the email already exists
  const alreadyLiked = await Like.findAll({
    where: { postId: req.params.postId, userId: req.user.id }
  })
  if (alreadyLiked?.length) {
    await Promise.all(alreadyLiked.map(like => like.destroy()))
  } else {
    const like = await Like.create({
      postId: req.params.postId,
      userId: req.user.id
    })
  }
  res.status(201).json('')
})

module.exports = router
