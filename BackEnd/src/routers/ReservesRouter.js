const express = require("express")
const router = express.Router()
const {viewReserves, viewReservesByUser, createReserves, deleteReserve} = require('../controllers/ReservesController')
const authMiddleware = require('../middleware/authMidleware')

router.get('/reserves', authMiddleware, viewReserves)
router.get('/reserves/user/:userId/cart/:cartId', authMiddleware, viewReservesByUser)

router.post('/reserves/register', authMiddleware, createReserves)

router.delete('/reserves/:id/delete', authMiddleware, deleteReserve)

module.exports = router