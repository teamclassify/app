import { Button, Center, Heading, Text } from '@chakra-ui/react'
import { Link } from 'wouter'

function LoanNotFound () {
  return (
    <Center flexDir="column" minH="calc(100vh - 100px)">
      <Heading mb={2} as="h2" size="lg">
        No se encuentra el préstamo
      </Heading>
      <Text mb={6}>
        El préstamo que estas buscando no existe por el momento.
      </Text>
      <Button as={Link} href="/home" colorScheme="primary">
        Ver todos tus préstamos
      </Button>
    </Center>
  )
}

export default LoanNotFound
