const express = require("express")
const router = express.Router()
const {viewAllEvents, createEvent, updateEventTitle, updateEventdescription, updateEventStart, updateEventEnd, updateAttachment, updateEventLink ,deleteEvent} = require('../controllers/CalendarEventsController')
const authMiddleware = require('../middleware/authMidleware')
const upload = require("../multerConfig/multer")
const verifyPermission = require('../middleware/roleMiddleware')

router.get('/calendar', authMiddleware, verifyPermission(['SuperAdmin', 'admin', 'User']), viewAllEvents)
router.post('/calendar/register', authMiddleware, upload.single('attachment'), verifyPermission(['SuperAdmin', 'admin']), createEvent)

router.patch('/calendar/:idCalendarEvents/title', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), updateEventTitle)
router.patch('/calendar/:idCalendarEvents/link', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), updateEventLink)
router.patch('/calendar/:idCalendarEvents/description', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), updateEventdescription)
router.patch('/calendar/:idCalendarEvents/start', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), updateEventStart)
router.patch('/calendar/:idCalendarEvents/end', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), updateEventEnd)
router.patch('/calendar/:idCalendarEvents/attachment', authMiddleware, upload.single('attachment') ,verifyPermission(['SuperAdmin', 'admin']), updateAttachment)

router.delete('/calendar/:idCalendarEvents/delete', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), deleteEvent)

module.exports = router