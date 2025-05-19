const express = require("express")
const router = express.Router()
const {viewAllBooks, viewOnlyOneBook, createBook, updateNameBook, updateAuthorBook, updateTagBook, updateOverView, updateCuriosityBook, updateBookQuantity, updateStatusAvailable, deleteBook} = require('../controllers/LibraryController')
const authMiddleware = require('../middleware/authMidleware')
const verifyPermission = require('../middleware/roleMiddleware')
const upload = require("../multerConfig/multer")

router.get('/library/:idLibrary', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), viewOnlyOneBook)
router.get('/library', authMiddleware, verifyPermission(['SuperAdmin', 'admin', 'User']), viewAllBooks)

router.post('/library/register', authMiddleware, upload.single('image') ,verifyPermission(['SuperAdmin', 'admin']), createBook)

router.patch('/library/:LibraryId/nameBook', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), updateNameBook)
router.patch('/library/:LibraryId/authorBook', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), updateAuthorBook)
router.patch('/library/:LibraryId/tagsBook', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), updateTagBook)
router.patch('/library/:LibraryId/overviewBook', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), updateOverView)
router.patch('/library/:LibraryId/bookQuantity', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), updateBookQuantity)
router.patch('/library/:LibraryId/curiosityBook', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), updateCuriosityBook)
router.patch('/library/:LibraryId/status_Available', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), updateStatusAvailable)

router.delete('/library/:LibraryId/delete', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), deleteBook)


module.exports = router