const express = require('express')
const { Follow, User } = require('../config/associations')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/:followingId', auth, async (req, res) => {
  const followerId = req.user.id
  const followingId = parseInt(req.params.followingId)

  console.log('followerId', followerId)
  console.log('followingId', followingId)

  if (followerId === followingId) {
    return res.status(400).json({ error: 'You cannot follow yourself.' })
  }

  try {
    // Check if both users exist
    const follower = await Follow.findOne({
      where: {
        followerId: followerId,
        followingId: followingId
      }
    })

    // check if already following
    if (follower) {
      await follower.destroy()
    } else {
      const follow = await Follow.create({ followerId, followingId })
    }

    res.status(200).json('')
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = router
