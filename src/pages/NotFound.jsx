import { Box, Button, Center, Heading, Image, Text } from '@chakra-ui/react'
import { Link } from 'wouter'

import Wrapper from '@/components/Wrapper'

function NotFound () {
  return (
    <Wrapper>
      <Center flexDir="column" gap={8} h="calc(100vh - 50px)">
        <Image src="/assets/not-found.svg" w="100%" maxW="250px" />

        <Box textAlign="center">
          <Heading as="h2" size="lg" mb={2}>
            Página no encontrada
          </Heading>

          <Text mb={4}>
            Parece que estás buscando una página que no existe en nuestra
            aplicación
          </Text>

          <Button as={Link} href="/" size="sm" colorScheme="primary">
            Volver al Inicio
          </Button>
        </Box>
      </Center>
    </Wrapper>
  )
}

export default NotFound
