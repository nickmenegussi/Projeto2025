const express = require("express")
const router = express.Router()
const {viewAllBooks, viewOnlyOneBook, createBook, updateNameBook, updateAuthorBook, updateTagBook, updateOverView, updateCuriosityBook, updateBookQuantity, updateStatusAvailable, deleteBook} = require('../controllers/LibraryController')
const authMiddleware = require('../middleware/authMidleware')
const verifyPermission = require('../middleware/roleMiddleware')

router.get('/library/:id', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), viewOnlyOneBook)
router.get('/library', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), viewAllBooks)

router.post('/library/register', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), createBook)

router.patch('/library/:LibraryId/nameBook', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), updateNameBook)
router.patch('/library/:LibraryId/authorBook', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), updateAuthorBook)
router.patch('/library/:LibraryId/tagsBook', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), updateTagBook)
router.patch('/library/:LibraryId/overviewBook', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), updateOverView)
router.patch('/library/:LibraryId/bookQuantity', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), updateBookQuantity)
router.patch('/library/:LibraryId/curiosityBook', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), updateCuriosityBook)
router.patch('/library/:LibraryId/status_Available', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), updateStatusAvailable)

router.delete('/library/:LibraryId/delete', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), deleteBook)


module.exports = router