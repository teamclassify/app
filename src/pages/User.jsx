import { Badge, Box, Heading } from '@chakra-ui/react'
import Carda from '../components/Card'
import MyLoans from '../components/MyLoans'
import UserOptions from '../components/UserOptions'
import Wrapper from '../components/Wrapper'

function User () {
  return (
    <Wrapper>
      <Box  px={8}>
        <Heading fontSize='1.2rem' fontFamily='sans-serif'></Heading>
        <UserOptions></UserOptions>
        <Carda>
          <><Badge >Realiza tú prestamo aquí con un  horario en tiempo real</Badge></>
          </Carda>
        <MyLoans pb={3}></MyLoans>
        <Carda>
        <><Badge>Tú PRESTAMO puede estar</Badge><Badge colorScheme='yellow'>EN ESPERA</Badge> <Badge colorScheme='green'>APROBADO</Badge> <Badge colorScheme='red'>RECHAZADO</Badge></>
        </Carda>
      </Box>
    </Wrapper>
  )
}

export default User
