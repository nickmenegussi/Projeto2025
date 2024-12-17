const express = require("express")
const router = express.Router()
const {viewReserves, viewReservesByUser, createReserves, deleteReserve} = require('../controllers/ReservesController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/reserves/:id', authMiddleware, viewReserves)
router.get('/reserves', authMiddleware, viewReservesByUser)

router.post('/reserves/register', authMiddleware, createReserves)

// router.patch('')

router.delete('/reserves/:id/delete', authMiddleware, deleteReserve)

module.exports = router