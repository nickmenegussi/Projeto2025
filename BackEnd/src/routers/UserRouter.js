const express = require("express")
const router = express.Router()
const {viewOnlyUser, viewAllUser, register, updateUser, updateUserPassword,  updateUserImageProfile,removeUser} = require('../controllers/UserController')
const {login} = require('../controllers/AuthController')
const authMiddleware = require('../middleware/authMiddleware')
const upload = require("../multerConfig/multer")


router.get('/user/:id', authMiddleware ,viewOnlyUser)
router.get('/user', authMiddleware, viewAllUser)

router.post('/register', upload.single('imagem') ,register)
router.post('/login' , login)

router.patch('/user/:id/name', authMiddleware, updateUserName)
router.patch('/user/:id/profile', authMiddleware, updateUser)
router.patch('/user/:id/password', authMiddleware, updateUserPassword )
router.patch('/user/:id/picture', authMiddleware, upload.single('imagem'), updateUserImageProfile)

router.delete('/user/:id', authMiddleware, removeUser)


module.exports = router