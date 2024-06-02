import { Box } from '@chakra-ui/react'

import MyLoans from '../components/MyLoans'
import UserOptions from '../components/UserOptions'
import Wrapper from '../components/Wrapper'
import useUser from '../hooks/useUser'
import LoadingUser from './LoadingUser'
import NotAuth from './NotAuth'

function User () {
  const { user, loading } = useUser()

  if (loading) {
    return <LoadingUser />
  }

  if (!loading && !user) {
    return <NotAuth />
  }

  return (
    <Wrapper>
      <Box>
        <UserOptions />
        <MyLoans />
        {/*
        <Carda>
          <Text mb={2}>Estados de los prestamos</Text>
          <Flex gap={2}>
            <Badge colorScheme="yellow">EN ESPERA</Badge>
            <Badge colorScheme="green">APROBADO</Badge>
            <Badge colorScheme="red">RECHAZADO</Badge>
          </Flex>
        </Carda> */}
      </Box>
    </Wrapper>
  )
}

export default User
