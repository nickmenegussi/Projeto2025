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


router.get('/notifications/:idNotifications', authMiddleware, verifyPermission(['SuperAdmin', 'admin']) ,viewNotificationsByUser)
router.get('/notifications/:idNotifications/status', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), getNotificationsStatusofRead)
router.get('/notifications', authMiddleware, verifyPermission(['SuperAdmin', 'admin']) ,viewAllNotifications)

router.post('/notifications/create', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), createNotification)

router.patch('/notification/:idNotifications/status', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), updateNotificationStatusofRead)
router.patch('/notifications/:idNotifications/message', authMiddleware,verifyPermission(['SuperAdmin', 'admin']),  updateNotificationMessage)

router.delete('/notifications/:idNotifications/delete', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), deleteNotification)

module.exports = router