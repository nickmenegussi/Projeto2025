const express = require('express')
const router = express.Router()
const { login, GenerateOtp, VerificationOtp, viewOtp} = require('../controllers/AuthController')
const verifyPermission = require('../middleware/roleMiddleware')

router.post('/login/create', login)
router.post('/otp/create', GenerateOtp)

router.post('/otp/Verification', VerificationOtp)
router.get('/otp/view', viewOtp, verifyPermission(['SuperAdmin']))

module.exports = router