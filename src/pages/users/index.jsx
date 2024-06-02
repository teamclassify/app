import { Box, Heading } from '@chakra-ui/react'

import Wrapper from '@/components/Wrapper'
import useUser from '../../hooks/useUser'
import NotAuth from '../NotAuth'
import ListOfUsers from './ListOfUsers'

function Users () {
  const { user, loading } = useUser()

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

        <ListOfUsers />
      </Box>
    </Wrapper>
  )
}

export default Users
