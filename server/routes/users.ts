import express from 'express'
import { verify } from 'jsonwebtoken'
import { profile } from '../controllers/users'

const router = express.Router()

router.get('/profile', profile)

// router.get('/:id', verifyToken, getUser)
// router.get('/:id/friends', verifyToken, getUserFriends)

// router.patch('/:id/:friendId', verifyToken, addOrRemoveFriend)

export default router
