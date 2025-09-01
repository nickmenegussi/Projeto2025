const express = require("express")
const router = express.Router()
const {viewAllLoans, viewLoansByUser, createLoan, updateReturnDate, deleteLoan} = require('../controllers/LoansController')
const authMiddleware = require('../middleware/authMidleware')
const verifyPermission = require('../middleware/roleMiddleware')

router.get('/loan/user', authMiddleware, verifyPermission(['admin', 'SuperAdmin'])  ,viewLoansByUser)
router.get('/loan', authMiddleware, viewAllLoans)

router.post('/loan/:Cart_idCart/register', authMiddleware, verifyPermission(['admin', 'SuperAdmin', 'User']) ,createLoan)

router.patch('/loan/:Cart_idCart/returnDate', authMiddleware, verifyPermission(['admin', 'SuperAdmin'])  ,updateReturnDate)

router.delete('/loan/:LoansId/:UserId/delete', authMiddleware, verifyPermission(['admin', 'SuperAdmin']) ,deleteLoan)


module.exports = router