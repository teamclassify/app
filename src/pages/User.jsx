import Wrapper from '../components/Wrapper'
import UserOptions from '../components/UserOptions'
import MyLoans from '../components/MyLoans'
import Carda from '../components/Card'
import { Box, Heading } from '@chakra-ui/react'

function User () {
  return (
    <Wrapper>
      <Box>
        <Heading fontSize='1.2rem' fontFamily='sans-serif'></Heading>
        <UserOptions></UserOptions>
        <Carda></Carda>
        <MyLoans></MyLoans>
        <Carda></Carda>
      </Box>
    </Wrapper>
  )
}

export default User
