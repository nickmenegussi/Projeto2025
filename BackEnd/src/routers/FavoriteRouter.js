const express = require("express")
const router = express.Router()
const {viewAllFavoritesByUser, createFavoriteBook} = require('../controllers/FavoriteController')
const authMiddleware = require('../middleware/authMidleware')

router.get('/favorite/user', authMiddleware, viewAllFavoritesByUser)
router.post('/favorite/register', authMiddleware, createFavoriteBook)

module.exports = router