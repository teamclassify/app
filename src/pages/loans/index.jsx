import { Box, Heading } from '@chakra-ui/react'
import { useLocation } from 'wouter'

import Wrapper from '@/components/Wrapper'
import useUser from '@/hooks/useUser'
import { useState } from 'react'
import NotAuth from '../NotAuth'
import Filters from './Filters'
import ListOfLoans from './ListOfLoans'

function Loans () {
  const [, setLocation] = useLocation()
  const { user, loading } = useUser()

  const [filterReason, setFilterReason] = useState('')
  const [filterState, setFilterState] = useState([])

  if (!loading && !user) setLocation('/')

  if (!loading && user && !user.roles.includes('admin') && !user.roles.includes('soporte_tecnico')) {
    return <NotAuth />
  }

  return (
    <Wrapper>
      <Box>
        <Heading as="h2" size="md" mb={4}>
          Préstamos pendientes
        </Heading>

        <Filters
          setFilterState={setFilterState}
          setFilterReason={setFilterReason}
        />

        <ListOfLoans filterState={filterState} filterReason={filterReason} />
      </Box>
    </Wrapper>
  )
}

export default Loans
