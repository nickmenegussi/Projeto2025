const express = require('express')
const router = express.Router()
const {
  viewNotificationsByUser,
  viewAllNotifications,
  createNotification,
  getNotificationsStatusofRead,
  updateNotificationStatusofRead,
  updateNotificationMessage,
  deleteNotification,
} = require('../controllers/NotificationsController')
const authMiddleware = require('../middleware/authMidleware')
const verifyPermission = require('../middleware/roleMiddleware')


router.get('/notifications/:idNotification', authMiddleware, verifyPermission('SuperAdmin', 'Admin') ,viewNotificationsByUser)
router.get('/notifications/:idNotification/status', authMiddleware, verifyPermission('SuperAdmin', 'Admin'), getNotificationsStatusofRead)

router.post('/notifications/create', authMiddleware, verifyPermission('SuperAdmin', 'Admin'), createNotification)

router.patch('/notifications/:idNotification/status', authMiddleware, verifyPermission('SuperAdmin', 'Admin'), updateNotificationStatusofRead)
router.patch('/notifications/:idNotification/message', authMiddleware,verifyPermission('SuperAdmin', 'Admin'),  updateNotificationMessage)

router.delete('/notifications/:idNotification/delete', authMiddleware, verifyPermission('SuperAdmin', 'Admin'), deleteNotification)

module.exports = router