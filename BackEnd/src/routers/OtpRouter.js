const express = require("express")
const router = express.Router()
const {login, GenerateOtp, VerificationOtp, viewOtp } = require('../controllers/AuthController')
const authMiddleware = require('../middleware/authMidleware')

router.post('/otp/generate', authMiddleware, GenerateOtp)
router.post('/otp/verification', authMiddleware, VerificationOtp)
router.get('/otp/view', authMiddleware ,viewOtp)

module.exports = router