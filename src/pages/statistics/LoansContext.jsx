import { createContext, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import StatsService from '../../services/api/StatsService'

export const LoansContext = createContext()

export default function LoansProvider ({ children }) {
  const [loans, setLoans] = useState([])
  const [year, setYear] = useState('total')

  const { isLoading, isRefetching } = useQuery(
    ['stats', 'loans-total', year],
    () => {
      return StatsService.getAllLoans(year)
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
      isLoading,
      isRefetching,
      year,
      setYear
    }
  }, [loans, isLoading, isRefetching, year])

  return (
    <LoansContext.Provider value={value}>{children}</LoansContext.Provider>
  )
}
