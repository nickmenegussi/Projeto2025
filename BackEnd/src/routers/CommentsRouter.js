const express = require("express")
const router = express.Router()
const {getCommentsByPostId, updateComment, deleteComment, createComment} = require("../controllers/CommentsController")
const authMiddleware = require("../middleware/authMidleware")

router.get('/comments/:postId',authMiddleware, getCommentsByPostId)
router.post('/comments/:postId',authMiddleware, createComment)
router.patch('/comments/:idComments', authMiddleware, updateComment)
router.delete('/comments/:idComments', authMiddleware, deleteComment)

module.exports = router