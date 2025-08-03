const express = require("express")
const router = express.Router()
const {getCommentsByPostId, updateComment, deleteComment, createComment} = require("../controllers/CommentsController")

router.get('/comments/:postId', getCommentsByPostId)
router.post('/comments', createComment)
router.patch('/comments/:idComments', updateComment)
router.delete('/comments/:idComments', deleteComment)