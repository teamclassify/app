import { Heading, Box, SimpleGrid } from '@chakra-ui/react'
import Loan from './Loan'

function MyLoans () {
  return (<>
    <Box display='flex' flexDirection='column' mt='3rem'>
      <Box display='flex' pb={3} alignContent='center' alignItems='center' justifyContent='start'>
      <Heading fontSize='1.2rem' fontFamily='sans-serif'>Prestamos Recientes</Heading>
      </Box>
      <SimpleGrid display='flex' flexDirection='row' spacing='4' mt='10px'>
        <Loan></Loan>
        <Loan></Loan>
        <Loan></Loan>
      </SimpleGrid>
    </Box>
  </>)
}

export default MyLoans
