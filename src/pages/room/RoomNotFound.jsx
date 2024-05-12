import { Center, Heading, Text } from '@chakra-ui/react'
import { IoWarningOutline } from 'react-icons/io5'

function RoomNotFound () {
  return (
    <Center flexDir="column" minH="calc(100vh - 100px)">
      <IoWarningOutline size='100px' />

      <Heading my={2} as="h2" size="lg">
        No se encuentra la sala
      </Heading>
      <Text mb={6}>La sala que estas buscando no existe por el momento.</Text>
    </Center>
  )
}

export default RoomNotFound
