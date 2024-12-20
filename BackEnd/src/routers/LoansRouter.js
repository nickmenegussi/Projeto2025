const express = require("express")
const router = express.Router()
const {viewAllLoans, viewLoansByUser, createLoan, updateReturnDate, deleteLoan} = require('../controllers/LoansController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/loan/:id', authMiddleware, viewLoansByUser)
router.get('/loan', authMiddleware, viewAllLoans)

router.post('/loan/register', authMiddleware, createLoan)

router.patch('/loan/:id/returnDate', authMiddleware, updateReturnDate)

router.delete('/loan/:id/delete', authMiddleware, deleteLoan)


module.exports = router