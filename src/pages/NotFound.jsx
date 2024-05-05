import { Box, Button, Center, Heading, Image, Text } from '@chakra-ui/react'
import { Link } from 'wouter'

import Wrapper from '@/components/Wrapper'

function NotFound () {
  return (
    <Wrapper>
      <Center flexDir="column" gap={8}>
        <Image src="/assets/not-found.svg" w="100%" maxW="300px" />
        <Box textAlign="center">
          <Heading as="h2" size="lg" mb={2}>
            Página no encontrada
          </Heading>

          <Text mb={4}>
            Parece que estás buscando una página que no existe en nuestra
            aplicación
          </Text>

          <Button
            as={Link}
            href="/"
            size="sm"
            variant="outline"
            colorScheme="primary"
          >
            Volver al Inicio
          </Button>
        </Box>
      </Center>
    </Wrapper>
  )
}

export default NotFound
