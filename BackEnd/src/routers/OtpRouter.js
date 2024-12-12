const express = require("express")
const router = express.Router()
const {login, GenerateOtp, VerificationOtp, viewOtp } = require('../controllers/AuthController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/generate-otp', authMiddleware, GenerateOtp)
router.post('/verification-otp', authMiddleware, VerificationOtp)
router.get('/viewOtp', authMiddleware ,viewOtp)