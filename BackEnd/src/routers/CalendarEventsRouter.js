const express = require("express")
const router = express.Router()
const {viewAllEvents, createEvent, updateEventTitle, updateEventdescription, updateEventStart, updateEventEnd, updateAttachment, updateEventLink ,deleteEvent} = require('../controllers/CalendarEventsController')
const authMiddleware = require('../middleware/authMidleware')
const upload = require("../multerConfig/multer")
const verifyPermission = require('../middleware/roleMiddleware')

router.get('/calendar', authMiddleware, viewAllEvents)
router.post('/calendar/register', authMiddleware, upload.single('attachment') ,verifyPermission(['SuperAdmin', 'Admin']), createEvent)

router.patch('/calendar/:idCalendarEvents/title', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), updateEventTitle)
router.patch('/calendar/:idCalendarEvents/link', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), updateEventLink)
router.patch('/calendar/:idCalendarEvents/description', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), updateEventdescription)
router.patch('/calendar/:idCalendarEvents/start', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), updateEventStart)
router.patch('/calendar/:idCalendarEvents/end', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), updateEventEnd)
router.patch('/calendar/:idCalendarEvents/attachment', authMiddleware, upload.single('attachment') ,verifyPermission(['SuperAdmin', 'Admin']), updateAttachment)

router.delete('/calendar/:idCalendarEvents/delete', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), deleteEvent)

module.exports = router