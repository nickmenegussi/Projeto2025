const express = require("express")
const router = express.Router()
const {viewVolunteerWork,createVolunteerWork ,updateNameVolunteerWork,updateAddressVolunteerWork,updateDateVolunteerWork,updateWorkDescriptionVolunteerWork,deleteVolunteerWork} = require('../controllers/VolunteerWorkController')

const authMiddleware = require('../middleware/authMiddleware')

router.get('/work', authMiddleware, viewVolunteerWork)

router.post('/workCreate', authMiddleware, createVolunteerWork)

router.patch('/work/:id/name', authMiddleware, updateNameVolunteerWork)
router.patch('/work/:id/address', authMiddleware, updateAddressVolunteerWork)
router.patch('/work/:id/date', authMiddleware, updateDateVolunteerWork)
router.patch('/work/:id/description', authMiddleware, updateWorkDescriptionVolunteerWork)

router.delete('/work/:id', authMiddleware, deleteVolunteerWork)


module.exports = router