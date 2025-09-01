const express = require("express")
const router = express.Router()
const {viewCartAll, viewCartByUser, updateAction, createCart, updateQuantity, deleteCart} = require('../controllers/CartController')
const authMiddleware = require('../middleware/authMidleware')


router.get('/cart/user/:idUser/library/:idLibrary', authMiddleware ,viewCartByUser)
router.get('/cart', authMiddleware ,viewCartAll)

router.post('/cart/register', authMiddleware, createCart)

router.patch('/cart/:id/action', authMiddleware, updateAction)
router.patch('/cart/quantity', authMiddleware, updateQuantity)


router.delete('/cart/:idCart', authMiddleware, deleteCart)

module.exports = router