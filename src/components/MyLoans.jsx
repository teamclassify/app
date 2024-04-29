import { Heading, Box, SimpleGrid, Button } from '@chakra-ui/react'
import Loan from './Loan'

function MyLoans () {
  return (<>
    <Box display='flex' flexDirection='column' mt='3rem' w='100%'>
      <Box w='100%' display='flex' justifyContent='space-between'>
      <Heading fontSize='1.5rem'>Mis Prestamos</Heading>
      <Button colorScheme="teal">Ver todos</Button>
      </Box>
      <SimpleGrid display='flex' flexDirection='column' spacing='4'>
        <Loan></Loan>
        <Loan></Loan>
        <Loan></Loan>
      </SimpleGrid>
    </Box>
  </>)
}

export default MyLoans
