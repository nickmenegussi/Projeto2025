const express = require("express")
const router = express.Router()
const {viewAllLoans, viewLoansByUser, createLoan, updateReturnDate, deleteLoan} = require('../controllers/LoansController')
const authMiddleware = require('../middleware/authMidleware')
const verifyPermission = require('../middleware/roleMiddleware')

router.get('/loan/:id', authMiddleware, verifyPermission(['Admin', 'SuperAdmin'])  ,viewLoansByUser)
router.get('/loan', authMiddleware, viewAllLoans)

router.post('/loan/register', authMiddleware, verifyPermission(['Admin', 'SuperAdmin']) ,createLoan)

router.patch('/loan/:id/returnDate', authMiddleware, verifyPermission(['Admin', 'SuperAdmin'])  ,updateReturnDate)

router.delete('/loan/:LoansId/:UserId/delete', authMiddleware, verifyPermission(['Admin', 'SuperAdmin']) ,deleteLoan)


module.exports = router