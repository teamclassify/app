import { useContext } from 'react'

import { UserContext } from '../context/UserContext'

function useUser () {
  const context = useContext(UserContext)

  return {
    ...context
  }
}

export default useUser
