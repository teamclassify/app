import { Box, Heading, SimpleGrid } from '@chakra-ui/react'
import Loan from './Loan'

function MyLoans () {
  return (<>
    <Box display='flex' flexDirection='column' mt='2rem'>
      <Box display='flex' alignContent='center' alignItems='center' justifyContent='start'>
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
