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

router.get('/likes', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), viewLikeMessages)
router.get('/likes/:PostId', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), viewLikeMessagesByUser)

router.post('/likes/create', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), createLikes)

router.delete('/likes/:LikesId/delete', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), deleteLike)

module.exports = router