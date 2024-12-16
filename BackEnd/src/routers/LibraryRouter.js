const express = require("express")
const router = express.Router()
const {viewAllBooks, viewOnlyOneBook, createBook, updateNameBook, updateAuthorBook, updateTagBook, updateOverView, updateCuriosityBook, updateBookQuantity, updateStatusAvailable, deleteBook} = require('../controllers/LibraryRouterController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/library/:id', authMiddleware, viewOnlyOneBook)
router.get('/library', authMiddleware, viewAllBooks)

router.post('/libraryRegister', authMiddleware, createBook)

router.patch('/library/:id/nameBook', authMiddleware, updateNameBook)
router.patch('/library/:id/authorBook', authMiddleware, updateAuthorBook)
router.patch('/library/:id/tagBook', authMiddleware, updateTagBook)
router.patch('/library/:id/overView', authMiddleware, updateOverView)
router.patch('/library/:id/bookQuantity', authMiddleware, updateBookQuantity)
router.patch('/library/:id/curiosityBook', authMiddleware, updateCuriosityBook)
router.patch('/library/:id/statusAvailable', authMiddleware, updateStatusAvailable)

router.delete('/library/:id')


module.exports = router