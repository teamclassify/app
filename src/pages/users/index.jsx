import { Box, Heading } from '@chakra-ui/react'

import Wrapper from '@/components/Wrapper'
import useUser from '../../hooks/useUser'
import NotAuth from '../NotAuth'
import ListOfUsers from './ListOfUsers'
import { useState } from 'react'
import Filters from './Filters.jsx'

function Users () {
  const { user, loading } = useUser()

  const [filterName, setFilterName] = useState('')
  const [filterState, setFilterState] = useState('')
  const [filterRol, setFilterRol] = useState('')

  if (!loading && !user) return <NotAuth />

  if (!loading && user && !user.roles.includes('superadmin')) {
    return <NotAuth />
  }

  return (
    <Wrapper>
      <Box>
        <Heading as="h2" mb={4} size="md">
          Usuarios
        </Heading>

        <Filters
          filterRol={filterRol}
          filterState={filterState}
          setFilterRol={setFilterRol}
          setFilterName={setFilterName}
          setFilterState={setFilterState}
        />

        <ListOfUsers
          filterState={filterState}
          filterName={filterName}
          filterRol={filterRol}
        />
      </Box>
    </Wrapper>
  )
}

export default Users
