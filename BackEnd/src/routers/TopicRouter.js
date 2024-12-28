const express = require('express')
const router = express.Router()
const {viewAllTopic, viewOnlyTopicById, createTopic, updateTitle, updateDescription, updateTopicImage, deleteTopic} = require('../controllers/TopicController')
const authMiddleware = require('../middleware/authMidleware')
const upload = require('../multerConfig/multer')

router.get('/topic', authMiddleware, viewAllTopic)
router.get('/topic/:topicId', authMiddleware, viewOnlyTopicById)

router.post('/topic/create', authMiddleware, upload.single('imagem'), createTopic)

router.patch('/topic/:topicId/title', authMiddleware, updateTitle)
router.patch('/topic/:topicId/description', authMiddleware, updateDescription)
router.patch('/topic/:topicId/image', authMiddleware, upload.single('imagem'), updateTopicImage)

router.delete('/topic/:topicId/delete', authMiddleware, deleteTopic)

module.exports = router