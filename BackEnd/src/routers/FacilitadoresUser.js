const express = require('express')
const router = express.Router()
const {
  viewAllFacilitadores,
  viewOnlyFacilitadorById,
  viewFacilitadoresByGroupoESDE,
  viewFacilitadoresByGroupoCIEDE,
  viewFacilitadoresByGroupoMEDIUNICO,
  createFacilitadores,
  deleteFacilitadores,
} = require('../controllers/FacilitadoresUserController')
const authMiddleware = require('../middleware/authMidleware')
const verifyPermission = require('../middleware/roleMiddleware')

router.get('/facilitadores', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), viewAllFacilitadores)
router.get('/facilitadores/:User_idUser', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), viewOnlyFacilitadorById)
router.get('/facilitadores/grupo/esde', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), viewFacilitadoresByGroupoESDE)
router.get('/facilitadores/grupo/ciede', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), viewFacilitadoresByGroupoCIEDE)
router.get('/facilitadores/grupo/mediunico', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), viewFacilitadoresByGroupoMEDIUNICO)

router.post('/facilitadores/create', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), createFacilitadores)

router.delete('/facilitadores/:idFacilitador/delete', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), deleteFacilitadores)

module.exports = router