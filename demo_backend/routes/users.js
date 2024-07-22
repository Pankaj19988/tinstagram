const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Follow = require('../models/Follow')

// GET user data by ID with followers and followings
router.get('/:id', async (req, res) => {
  const userId = req.params.id

  try {
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Follow,
          as: 'followers',
          attributes: ['followerId']
        },
        {
          model: Follow,
          as: 'following',
          attributes: ['followingId']
        }
      ]
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Extract followerIds and followingIds arrays
    const followerIds = user.followers.map(follower => follower.followerId)
    const followingIds = user.following.map(following => following.followingId)

    // Return user data along with followerIds and followingIds
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      followerIds,
      followingIds
    })
  } catch (error) {
    console.error('Error fetching user data:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// GET all user data
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Follow,
          as: 'followers',
          attributes: ['followerId']
        },
        {
          model: Follow,
          as: 'following',
          attributes: ['followingId']
        }
      ]
    })

    // Return user data along with counts
    res.json(
      users.map(a => {
        // Extract followerIds and followingIds arrays
        const followerIds = a.followers.map(follower => follower.followerId)
        const followingIds = a.following.map(following => following.followingId)
        return {
          name: a.name,
          email: a.email,
          id: a.id,
          followerIds,
          followingIds
        }
      })
    )
  } catch (error) {
    console.error('Error fetching user data:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
