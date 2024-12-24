const express = require('express')
const router = express.Router()
const {ViewAllAdmins, ViewOnlyAdminByUser, updateUserNoPermission, updateUserPermissionAdminToUser} = require('../controllers/AdminController')
const authMiddleware = require('../middleware/authMidleware')
const verifyPermission = require('../middleware/roleMiddleware')

router.get('/admin', authMiddleware, verifyPermission(['Admin', 'SuperAdmin']), ViewAllAdmins)
router.get('/admin/:UserId', authMiddleware, verifyPermission(['Admin', 'SuperAdmin']), ViewOnlyAdminByUser)

router.patch('/admin/:UserId/permission', authMiddleware, verifyPermission(['Admin', 'SuperAdmin']), updateUserNoPermission)
router.patch('/admin/:UserId/permission/admin', authMiddleware, verifyPermission(['Admin', 'SuperAdmin']), updateUserPermissionAdminToUser)


module.exports = router