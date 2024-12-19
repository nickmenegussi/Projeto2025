const express = require("express")
const router = express.Router()
const {viewOnlyUser, viewAllUser, register, updateUser, updateUserName ,updateUserPassword,  updateUserImageProfile,removeUser} = require('../controllers/UserController')
const {login} = require('../controllers/AuthController')
const authMiddleware = require('../middleware/authMidleware')
const upload = require("../multerConfig/multer")
const verifyPermission = require('../middleware/roleMiddleware')
const verifyOwnerShip = require('../middleware/verifyOwnerShip')


router.get('/user/:userId', authMiddleware, verifyPermission(['Admin', 'SuperAdmin']),viewOnlyUser)
router.get('/user', authMiddleware, verifyPermission(['Admin', 'SuperAdmin']) ,viewAllUser)

router.post('/user/register', upload.single('imagem') ,register)
router.post('/user/login' , login)

router.patch('/user/:userId/name',authMiddleware, verifyOwnerShip , updateUserName)
router.patch('/user/:userId/profile', authMiddleware, verifyOwnerShip ,updateUser)
router.patch('/user/:userId/password', authMiddleware, verifyOwnerShip ,updateUserPassword )
router.patch('/user/:userId/picture', authMiddleware, verifyOwnerShip ,upload.single('imagem'), updateUserImageProfile)

router.delete('/user/:userId/delete', verifyPermission(['Admin', 'SuperAdmin']) ,authMiddleware, removeUser)


module.exports = router