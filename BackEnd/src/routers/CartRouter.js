const express = require("express")
const router = express.Router()
const {viewCartAll, viewCartByUser, updateAction, createCart, deleteCart} = require('../controllers/CartController')
const authMiddleware = require('../middleware/authMidleware')


router.get('/cart/:id', authMiddleware ,viewCartByUser)
router.get('/cart', authMiddleware ,viewCartAll)

router.post('/cart/register', authMiddleware, createCart)

router.patch('/cart/:id/action', authMiddleware, updateAction)

router.delete('/cart/:id/delete', authMiddleware, deleteCart)

module.exports = router