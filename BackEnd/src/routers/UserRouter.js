const express = require("express")
const router = express.Router()
const {viewOnlyUser, viewAllUser, register, updateUser, updateUserName ,updateUserPassword,  updateUserImageProfile,deleteAccountUser} = require('../controllers/UserController')
const authMiddleware = require('../middleware/authMidleware')
const upload = require("../multerConfig/multer")
const verifyPermission = require('../middleware/roleMiddleware')

router.get('/user/:userId', authMiddleware, verifyPermission(['admin', 'SuperAdmin', 'User']),viewOnlyUser)
router.get('/user', authMiddleware, verifyPermission(['admin', 'SuperAdmin']) ,viewAllUser)

router.post('/user/register' ,register)

router.patch('/user/name',authMiddleware , updateUserName)
router.patch('/user/profile', authMiddleware ,updateUser)
router.patch('/user/password', authMiddleware ,updateUserPassword )
router.patch('/user/picture', authMiddleware , upload.single('imagem'), updateUserImageProfile)

router.delete('/user/:idUser/delete', authMiddleware ,verifyPermission(['SuperAdmin','admin']) , deleteAccountUser)


module.exports = router