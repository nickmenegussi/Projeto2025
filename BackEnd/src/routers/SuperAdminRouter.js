const express = require('express')
const router = express.Router()
const {ViewAllAdmins, ViewOnlyAdminByUser, updateUserNoPermissionToAdmin, updateUserPermissionAdminToUser} = require('../controllers/AdminController')  
const authMiddleware = require('../middleware/authMidleware')

router.get('/admin', authMiddleware, ViewAllAdmins)
router.get('/admin/:idUser', authMiddleware, ViewOnlyAdminByUser)

router.patch('/admin/:idUser', authMiddleware, updateUserNoPermissionToAdmin)
