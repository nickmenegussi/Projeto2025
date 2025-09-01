import { useEffect, useState } from "react"
import { getLoan, getLoanById } from "../services/ServiceLoan"

export default function useLoan() {
  const [loan, setLoan] = useState(null)
  const [loading, setLoading] = useState(true)
  const [hasLoan, setHasLoan] = useState(false)

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const loan = await getLoanById()
        if(loan){
          setLoan(loan.loans)
          setHasLoan(loan.HasALoan)
        }
      } catch (error) {
        console.error("Erro ao carregar Empréstimos", error)
      } finally {
        setLoading(false)
      }
    }
    fetchLoan()
  }, [])
  return { loan, hasLoan, loading}
}
