const express = require('express')
const router = express.Router()
const {ViewAllAdmins, ViewOnlyAdminByUser, updateUserNoPermission, updateUserPermissionAdminToUser} = require('../controllers/AdminController')
const authMiddleware = require('../middleware/authMidleware')
const verifyPermission = require('../middleware/roleMiddleware')

router.get('/admin', authMiddleware, verifyPermission(['Admin', 'SuperAdmin']), ViewAllAdmins)
router.get('/admin/:idUser', authMiddleware, verifyPermission(['Admin', 'SuperAdmin']), ViewOnlyAdminByUser)

// essa mudança serve para mudar o status de um user para admin
router.patch('/admin/:idUser', authMiddleware, verifyPermission(['Admin', 'SuperAdmin']), updateUserNoPermission)

// essa mudança serve para mudar o status de um admin para user
router.patch('/admin/:idUser', authMiddleware, verifyPermission(['SuperAdmin']), updateUserPermissionAdminToUser)


module.exports = router