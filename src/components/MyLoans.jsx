import { Box, Heading, SimpleGrid } from '@chakra-ui/react'
import Loan from './Loan'

function MyLoans () {
  return (
    <>
      <Box display="flex" flexDirection="column" mt="2rem">
        <Box
          display="flex"
          alignContent="center"
          alignItems="center"
          justifyContent="start"
        >
          <Heading fontSize="1.2rem" fontFamily="sans-serif">
            Prestamos Recientes
          </Heading>
        </Box>
        <SimpleGrid display="flex" flexDirection="row" spacing="4" mt="10px">
          <Loan Room='SA 414' Date="9/5/2024" State={1}/>
          <Loan Room='SB 404' Date="7/5/2024" State={0}/>
          <Loan Room='SA 402' Date="19/5/2024" State={-1}/>
        </SimpleGrid>
      </Box>
    </>
  )
}

export default MyLoans
