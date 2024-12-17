const express = require("express")
const router = express.Router()
const {viewPost, viewPostByUser, createPost, updateContentPost, updateImagePost, deletePost} = require('../controllers/PostMessageController')
const authMiddleware = require('../middleware/authMiddleware')
const upload = require("../multerConfig/multer")

router.get('/post', authMiddleware, viewPost)
router.get('/post/:id/user', authMiddleware, viewPostByUser)

router.post('/post/register', authMiddleware, createPost)

router.patch('/post/:id/content', authMiddleware, updateContentPost)
router.patch('/post/:id/picture', upload.single('imagem') ,authMiddleware, updateImagePost)

router.delete('/post/:id/remove', authMiddleware, deleteLike)

module.exports = router