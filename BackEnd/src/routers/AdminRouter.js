const express = require('express')
const router = express.Router()
const {ViewAllAdmins, ViewOnlyAdminByUser, updateUserPermission} = require('../controllers/AdminController')
const authMiddleware = require('../middleware/authMidleware')
const verifyPermission = require('../middleware/roleMiddleware')

router.get('/admin', authMiddleware, verifyPermission(['SuperAdmin']), ViewAllAdmins)
router.get('/admin/:idUser', authMiddleware, verifyPermission(['SuperAdmin']), ViewOnlyAdminByUser)

// essa mudança serve para mudar o status de um user para admin
router.patch('/admin/:idUser/Permission', authMiddleware, verifyPermission(['SuperAdmin']), updateUserPermission)

module.exports = router