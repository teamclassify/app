import { Badge, Box, Text } from '@chakra-ui/react'
import Carda from '../components/Card'
import MyLoans from '../components/MyLoans'
import UserOptions from '../components/UserOptions'
import Wrapper from '../components/Wrapper'
import useUser from '../hooks/useUser'
import NotAuth from './NotAuth'

function User () {
  const { user, loading } = useUser()

  if (!loading && !user) {
    return <NotAuth />
  }

  return (
    <Wrapper>
      <Box>
        <UserOptions></UserOptions>
        <Carda>
          <Text>Realiza tú prestamo aquí con un horario en tiempo real</Text>
        </Carda>
        <MyLoans pb={3}></MyLoans>
        <Carda>
          <>
            <Badge>Tú PRESTAMO puede estar</Badge>
            <Badge colorScheme="yellow">EN ESPERA</Badge>{' '}
            <Badge colorScheme="green">APROBADO</Badge>{' '}
            <Badge colorScheme="red">RECHAZADO</Badge>
          </>
        </Carda>
      </Box>
    </Wrapper>
  )
}

export default User
