const express = require("express")
const router = express.Router()
const {viewVolunteerWork, updateTimeVolunteerWork, viewOnlyVolunteerWork ,createVolunteerWork ,updateNameVolunteerWork,updateAddressVolunteerWork,updateDateVolunteerWork,updateWorkDescriptionVolunteerWork,deleteVolunteerWork} = require('../controllers/VolunteerWorkController')
const verifyPermission = require('../middleware/roleMiddleware')
const authMiddleware = require('../middleware/authMidleware')

router.get('/work', authMiddleware, verifyPermission(['SuperAdmin', 'admin', 'User']), viewVolunteerWork)
router.get('/work/:idVolunteerWork', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), viewOnlyVolunteerWork)

router.post('/work/Create', authMiddleware, verifyPermission(['SuperAdmin', 'admin']) , createVolunteerWork)

router.patch('/work/:idVolunteerWork/nameVolunteerWork', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), updateNameVolunteerWork)
router.patch('/work/:idVolunteerWork/address', authMiddleware, verifyPermission(['SuperAdmin', 'admin']) , updateAddressVolunteerWork)
router.patch('/work/:idVolunteerWork/dateVolunteerWork', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), updateDateVolunteerWork)
router.patch('/work/:idVolunteerWork/work_description', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), updateWorkDescriptionVolunteerWork)
router.patch('/work/:idVolunteerWork/timeVolunteerWork', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), updateTimeVolunteerWork)

router.delete('/work/:idVolunteerWork/delete', authMiddleware, verifyPermission(['SuperAdmin', 'admin']) ,deleteVolunteerWork)


module.exports = router