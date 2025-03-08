const express = require("express")
const router = express.Router()
const {viewVolunteerWork, viewOnlyVolunteerWork ,createVolunteerWork ,updateNameVolunteerWork,updateAddressVolunteerWork,updateDateVolunteerWork,updateWorkDescriptionVolunteerWork,deleteVolunteerWork} = require('../controllers/VolunteerWorkController')
const verifyPermission = require('../middleware/roleMiddleware')
const authMiddleware = require('../middleware/authMidleware')

router.get('/work', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), viewVolunteerWork)
router.get('/work/:VolunteerWorkId', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), viewOnlyVolunteerWork)

router.post('/work/Create', authMiddleware, verifyPermission(['SuperAdmin', 'admin']) , createVolunteerWork)

router.patch('/work/:VolunteerWorkId/name', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), updateNameVolunteerWork)
router.patch('/work/:VolunteerWorkId/address', authMiddleware, verifyPermission(['SuperAdmin', 'admin']) , updateAddressVolunteerWork)
router.patch('/work/:VolunteerWorkId/date', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), updateDateVolunteerWork)
router.patch('/work/:VolunteerWorkId/description', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), updateWorkDescriptionVolunteerWork)

router.delete('/work/:VolunteerWorkId/delete', authMiddleware, verifyPermission(['SuperAdmin', 'admin']) ,deleteVolunteerWork)


module.exports = router