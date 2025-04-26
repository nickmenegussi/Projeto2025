const express = require('express')
const router = express.Router()
const {ViewReviewSociety, CreateReviewSociety, DeleteReviewSociety, UpdateReviewSociety} = require('../controllers/ReviewSociety')
const authMiddleware = require('../middleware/authMidleware')
const verifyPermission = require('../middleware/roleMiddleware')

router.get('/reviewSociety', authMiddleware, verifyPermission(['SuperAdmin', 'Admin', 'User']), ViewReviewSociety)
router.post('/reviewSociety/create', authMiddleware, verifyPermission(['SuperAdmin', 'Admin', 'User']), CreateReviewSociety)
router.put('/reviewSociety/:idReviewSociety/update', authMiddleware, verifyPermission(['SuperAdmin', 'Admin', 'User']), UpdateReviewSociety)
router.delete('/reviewSociety/:idReviewSociety/delete', authMiddleware, verifyPermission(['SuperAdmin', 'Admin', 'User']), DeleteReviewSociety) 

module.exports = router