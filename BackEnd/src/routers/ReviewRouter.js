const express = require('express')
const router = express.Router()
const {ViewReviewSociety, CreateReviewSociety} = require('../controllers/ReviewSociety')
const authMiddleware = require('../middleware/authMidleware')
const verifyPermission = require('../middleware/roleMiddleware')

router.get('/reviewSociety', authMiddleware, verifyPermission(['SuperAdmin', 'Admin', 'User']), ViewReviewSociety)
router.post('/reviewSociety/create', authMiddleware, verifyPermission(['SuperAdmin', 'Admin', 'User']), CreateReviewSociety)

module.exports = router