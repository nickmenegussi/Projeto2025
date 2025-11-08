const express = require("express")
const router = express.Router()
const {viewReserves, viewReservesByUser, createReserves, deleteReserve} = require('../controllers/ReservesController')
const authMiddleware = require('../middleware/authMidleware')
const verifyPermission = require('../middleware/roleMiddleware')

router.get('/reserves', authMiddleware, viewReserves)
router.get('/reserves/user', authMiddleware, verifyPermission(['admin', 'SuperAdmin', 'User'])  ,viewReservesByUser)

// router.post('/reserves/register', authMiddleware, createReserves)

router.delete('/reserves/:ReserveId/delete', authMiddleware, deleteReserve)

module.exports = router