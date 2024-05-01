import {
  LinkBox,
  LinkOverlay,
  Heading,
  Box,
  SimpleGrid
} from '@chakra-ui/react'
import { IoIosAddCircle, IoMdWarning } from 'react-icons/io'

function userOptions () {
  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(1rem, 14rem))"
      mt='1rem'

    >
      <LinkBox
        textAlign="center"
        maxW="sm"
        p="8"
        rounded='xl'
        backgroundColor="rgb(0, 160, 182)"
      >
        <Box display="flex" alignItems="center" justifyContent="center">
          <IoIosAddCircle size="50px" color="white" />
        </Box>
        <Heading size="md" my="2" fontFamily="sans-serif">
          <LinkOverlay href="" fontSize="1rem" color='white'>
            Solicitar Prestamo
          </LinkOverlay>
        </Heading>
      </LinkBox>

      <LinkBox
        textAlign="center"
        maxW="sm"
        p="8"
        rounded='xl'
        backgroundColor="rgb(224 216 108)"
      >
        <Box display="flex" alignItems="center" justifyContent="center">
          <IoMdWarning size="50px" color="white" />
        </Box>
        <Heading size="md" my="2" fontFamily="sans-serif">
          <LinkOverlay href="" fontSize="1rem" color='white'>
            Reportar Fallo
          </LinkOverlay>
        </Heading>
      </LinkBox>
    </SimpleGrid>
  )
}

export default userOptions
