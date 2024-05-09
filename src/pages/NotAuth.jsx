import { Box, Button, Center, Heading, Image, Text } from '@chakra-ui/react'
import { Link } from 'wouter'

import Wrapper from '@/components/Wrapper'

function NotAuth () {
  return (
    <Wrapper>
      <Center flexDir="column" gap={8} h='calc(100vh - 50px)'>
        <Image src="/assets/block.svg" w="100%" maxW="300px" />

        <Box textAlign="center">
          <Heading as="h2" size="lg" mb={2}>
            No estas autorizado
          </Heading>

          <Text mb={4}>No tienes permisos para acceder a esta página</Text>

          <Button
            as={Link}
            href="/"
            size="sm"
            colorScheme="primary"
          >
            Volver al Inicio
          </Button>
        </Box>
      </Center>
    </Wrapper>
  )
}

export default NotAuth
