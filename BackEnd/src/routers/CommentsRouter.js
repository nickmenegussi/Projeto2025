const express = require("express")
const router = express.Router()
const {getCommentsByPostId, updateComment, deleteComment, createComment} = require("../controllers/CommentsController")

router.get('/comments/:postId', getCommentsByPostId)
router.post('/comments/:postId', createComment)
router.patch('/comments/:idComments', updateComment)
router.delete('/comments/:idComments', deleteComment)

module.exports = router