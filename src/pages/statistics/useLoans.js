import { useContext } from 'react'

import { LoansContext } from './LoansContext.jsx'

function useLoans () {
  const context = useContext(LoansContext)

  return {
    ...context
  }
}

export default useLoans
