import { Center, Heading, Text } from '@chakra-ui/react'

function RoomNotFound () {
  return (
    <Center flexDir="column" minH="calc(100vh - 100px)">
      <Heading mb={2} as="h2" size="lg">
        No se encuentra la sala
      </Heading>
      <Text mb={6}>La sala que estas buscando no existe por el momento.</Text>
    </Center>
  )
}

export default RoomNotFound
