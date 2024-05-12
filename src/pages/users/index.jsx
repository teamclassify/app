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
        <Box py={4}>
          <Heading as="h2" size="md">
            Usuarios
          </Heading>
        </Box>

        <ListOfUsers />
      </Box>
    </Wrapper>
  )
}

export default Users
