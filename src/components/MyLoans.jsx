import { Box, Heading } from '@chakra-ui/react'
import ListOfLoans from './ListOfLoans'

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
        <ListOfLoans/>
      </Box>
    </>
  )
}

export default MyLoans
