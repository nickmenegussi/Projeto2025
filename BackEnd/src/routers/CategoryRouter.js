const express = require("express")
const router = express.Router()
const {getCategories, getTopicbyCategory, createCategory} = require("../controllers/CategoryController")
const authMiddleware = require('../middleware/authMidleware')
const verifyPermission = require('../middleware/roleMiddleware')

router.get("/category", authMiddleware, getCategories)
router.get("/category/:nameCategory", getTopicbyCategory)

router.post('/category', authMiddleware, createCategory)

module.exports = router