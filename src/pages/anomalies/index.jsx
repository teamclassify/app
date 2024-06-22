import { Box, Heading } from '@chakra-ui/react'
import { useLocation } from 'wouter'
import { useState } from 'react'

import Wrapper from '@/components/Wrapper'
import useUser from '@/hooks/useUser'
import NotAuth from '../NotAuth'
import ListOfAnomalies from './ListOfAnomalies'
import Filters from './Filters.jsx'

function Anomalies () {
  const [, setLocation] = useLocation()
  const { user, loading } = useUser()

  const [filterDescription, setFilterDescription] = useState('')
  const [filterState, setFilterState] = useState([])

  if (!loading && !user) setLocation('/')

  if (
    !loading &&
    user &&
    !user.roles.includes('admin') &&
    !user.roles.includes('soporte_tecnico')
  ) {
    return <NotAuth />
  }

  return (
    <Wrapper>
      <Box>
        <Heading as="h2" size="md" mb={4}>
          Anomalías
        </Heading>

        <Filters
          setFilterState={setFilterState}
          setFilterDescription={setFilterDescription}
        />

        <ListOfAnomalies
          filterState={filterState}
          filterDescription={filterDescription}
        />
      </Box>
    </Wrapper>
  )
}

export default Anomalies
