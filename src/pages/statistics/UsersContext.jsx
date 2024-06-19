import { createContext, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import StatsService from '../../services/api/StatsService'

export const UsersContext = createContext()

export default function UsersProvider ({ children }) {
  const [users, setUsers] = useState([0, 0])

  const { isLoading, isRefetching } = useQuery(
    ['stats', 'users'],
    () => {
      return StatsService.getUsers()
    },
    {
      onSuccess: (data) => {
        if (!data.success) return

        const actives = data?.data?.find((el) => el.estado === 'ACTIVO')
        const inactives = data?.data?.find((el) => el.estado === 'INACTIVO')

        setUsers([inactives?.user_count ?? 0, actives?.user_count ?? 0])
      }
    }
  )

  const value = useMemo(() => {
    return {
      users,
      isLoading: isLoading || isRefetching
    }
  }, [users, isLoading, isRefetching])

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  )
}
