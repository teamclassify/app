import { useContext } from 'react'

import { UsersContext } from './UsersContext'

function useUsers () {
  const context = useContext(UsersContext)

  return {
    ...context
  }
}

export default useUsers
