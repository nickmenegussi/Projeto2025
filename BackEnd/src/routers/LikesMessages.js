// const express = require('express')
// const router = express.Router()
// const {
//   viewLikeMessages,
//   viewLikeMessagesByPost,
//   createLikes,
//   deleteLike,
// } = require('../controllers/LikesMessageController')
// const authMiddleware = require('../middleware/authMidleware')
// const verifyPermission = require('../middleware/roleMiddleware')

// router.get('/likes', authMiddleware, verifyPermission(['SuperAdmin', 'admin', 'User']), viewLikeMessages)
// router.get('/likes/:PostId', authMiddleware, verifyPermission(['SuperAdmin', 'admin', 'User']), viewLikeMessagesByPost)

// router.post('/likes/:PostId/create', authMiddleware, verifyPermission(['SuperAdmin', 'admin', 'User']), createLikes)

// router.delete('/likes/:LikesId/delete', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), deleteLike)

// module.exports = router