import { createContext, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import StatsService from '../../services/api/StatsService'

export const LoansContext = createContext()

export default function LoansProvider ({ children }) {
  const [loans, setLoans] = useState([])

  const { isLoading, isRefetching } = useQuery(
    ['stats', 'loans-total'],
    () => {
      return StatsService.getAllLoans()
    },
    {
      onSuccess: (data) => {
        if (!data.success) return

        setLoans(data?.data)
      }
    }
  )

  const value = useMemo(() => {
    return {
      loans,
      isLoading: isLoading || isRefetching
    }
  }, [loans, isLoading, isRefetching])

  return (
    <LoansContext.Provider value={value}>{children}</LoansContext.Provider>
  )
}
