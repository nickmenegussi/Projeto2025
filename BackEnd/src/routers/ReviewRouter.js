const express = require('express')
const router = express.Router()
const {ViewReviewSociety} = require('../controllers/ReviewSociety')
const authMiddleware = require('../middleware/authMidleware')
const verifyPermission = require('../middleware/roleMiddleware')

router.get('/reviewSociety', authMiddleware, verifyPermission(['SuperAdmin', 'Admin', 'User']), ViewReviewSociety)

module.exports = router