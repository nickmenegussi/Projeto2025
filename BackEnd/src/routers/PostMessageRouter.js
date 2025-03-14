const express = require("express")
const router = express.Router()
const {viewPost, viewPostByUser, createPost, updateContentPost, updateImagePost, deletePost} = require('../controllers/PostMessageController')
const authMiddleware = require('../middleware/authMidleware')
const upload = require("../multerConfig/multer")

router.get('/post', authMiddleware, viewPost)
router.get('/post/:idPost/user', authMiddleware, viewPostByUser)

router.post('/post/register', authMiddleware, upload.single('image') ,createPost)

router.patch('/post/:idPost/content', authMiddleware, updateContentPost)
router.patch('/post/:idPost/image', authMiddleware, upload.single('image') , updateImagePost)

router.delete('/post/:idPost/remove', authMiddleware, deletePost)

module.exports = router