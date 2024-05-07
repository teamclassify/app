import { Button, Center, Heading, Text } from '@chakra-ui/react'
import { Link } from 'wouter'

function RoomNotFound () {
  return (
    <Center flexDir="column" minH="calc(100vh - 100px)">
      <Heading mb={2} as="h2" size="lg">
        No se encuentra la sala
      </Heading>
      <Text mb={6}>La sala que estas buscando no existe por el momento.</Text>
      <Button as={Link} href="/salas" colorScheme="primary">
        Ver todas las salas
      </Button>
    </Center>
  )
}

export default RoomNotFound
