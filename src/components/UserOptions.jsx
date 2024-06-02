import {
  Box,
  Heading,
  LinkBox,
  LinkOverlay,
  SimpleGrid
} from '@chakra-ui/react'
import { IoIosAddCircle } from 'react-icons/io'
import { Link } from 'wouter'

function userOptions () {
  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(1rem, 14rem))"

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
          <LinkOverlay as={Link} href="/nuevo-prestamo" fontSize="1rem" color='white'>
            Solicitar préstamo
          </LinkOverlay>
        </Heading>
      </LinkBox>
    </SimpleGrid>
  )
}

export default userOptions
