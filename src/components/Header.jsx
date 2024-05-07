import { Box, Flex, Heading } from '@chakra-ui/react'

function Header () {
  return (
    <Box as="header" py={2}>
      <Flex justifyContent='space-between'>
        <Heading as='h1' size='md'>PRESTAMO DE SALAS</Heading>
      </Flex>
    </Box>
  )
}

export default Header
