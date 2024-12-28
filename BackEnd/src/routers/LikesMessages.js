const express = require('express')
const router = express.Router()
const {
  viewLikeMessages,
  viewLikeMessagesByUser,
  createLikes,
  deleteLike,
} = require('../controllers/LikesMessageController')
const authMiddleware = require('../middleware/authMidleware')
const verifyPermission = require('../middleware/roleMiddleware')

router.get('/likes', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), viewLikeMessages)
router.get('/likes/:PostId', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), viewLikeMessagesByUser)

router.post('/likes/create', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), createLikes)

router.delete('/likes/:LikesId/delete', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), deleteLike)

module.exports = router