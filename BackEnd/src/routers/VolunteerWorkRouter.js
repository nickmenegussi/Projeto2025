const express = require("express")
const router = express.Router()
const {viewVolunteerWork, viewOnlyVolunteerWork ,createVolunteerWork ,updateNameVolunteerWork,updateAddressVolunteerWork,updateDateVolunteerWork,updateWorkDescriptionVolunteerWork,deleteVolunteerWork} = require('../controllers/VolunteerWorkController')
const verifyPermission = require('../middleware/roleMiddleware')
const authMiddleware = require('../middleware/authMidleware')

router.get('/work', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), viewVolunteerWork)
router.get('/work/:VolunteerWorkId', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), viewOnlyVolunteerWork)

router.post('/workCreate', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']) , createVolunteerWork)

router.patch('/work/:VolunteerWorkId/name', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), updateNameVolunteerWork)
router.patch('/work/:VolunteerWorkId/address', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']) , updateAddressVolunteerWork)
router.patch('/work/:VolunteerWorkId/date', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), updateDateVolunteerWork)
router.patch('/work/:VolunteerWorkId/description', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), updateWorkDescriptionVolunteerWork)

router.delete('/work/:VolunteerWorkId/delete', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']) ,deleteVolunteerWork)


module.exports = router