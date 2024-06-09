import { Badge, Box, Flex, Heading } from '@chakra-ui/react'
import ListOfLoans from './ListOfLoans'

function MyLoans () {
  return (
    <>
      <Box display="flex" flexDirection="column" mt="2rem">
        <Box
          mb={2}
          display="flex"
          alignContent="center"
          alignItems="center"
          justifyContent="start"
        >
          <Heading fontSize="1.2rem" fontFamily="sans-serif">
            Préstamos recientes
          </Heading>
        </Box>

        <Flex gap={2} mb={2}>
          <Badge colorScheme="yellow">Pendiente</Badge>
          <Badge colorScheme="green">Aprobado</Badge>
          <Badge colorScheme="red">Cancelado</Badge>
        </Flex>

        <ListOfLoans />
      </Box>
    </>
  )
}

export default MyLoans
