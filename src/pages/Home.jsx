import { Box, Button, Flex, Heading, Image } from '@chakra-ui/react'
import { Link } from 'wouter'

function Home () {
  return (
    <>
      <Box bg="white">
        <Flex
          py={4}
          w="90%"
          mx="auto"
          as="header"
          maxW="container.xl"
          justifyContent="space-between"
        >
          <Flex alignItems="center" gap={4}>
            <Image src="/favicon.ico" alt="Logo" w="30px" />
            <Heading size="md">Prestamo de Salas</Heading>
          </Flex>

          <Flex>
            <Button colorScheme="blue" size="sm" as={Link} href="/login">
              Iniciar Sesión
            </Button>
          </Flex>
        </Flex>
      </Box>

      <section>
        <Flex
          gap={12}
          my={10}
          as="main"
          mx="auto"
          maxW="container.xl"
          alignItems="center"
        >
          <Box>
            <Heading
              mb={4}
              size="xl"
              textAlign="left"
              style={{
                textWrap: 'balance'
              }}
            >
              Bienvenido a la aplicación de prestamo de salas
            </Heading>

            <Heading mb={8} size="md" textAlign="left" fontWeight="400">
              Inicia sesión para reservar una sala en el horario que más te
              convenga.
            </Heading>

            <Flex mt={4} gap={2}>
              <Link href="/horario">
                <Button colorScheme="primary" size="md">
                  Ver Horario
                </Button>
              </Link>
            </Flex>
          </Box>

          <Image
            mt={4}
            mb={4}
            rounded="md"
            maxW="container.sm"
            alt="Imagen de inicio"
            src="/assets/schedule-screenshot.png"
          />
        </Flex>
      </section>

      <footer>
        <Flex
          as="footer"
          py={8}
          w="90%"
          mx="auto"
          maxW="container.xl"
          justifyContent="center"
        >
          <Heading size="sm">
            © {new Date().getFullYear()} - Prestamo de Salas
          </Heading>
        </Flex>
      </footer>
    </>
  )
}

export default Home
