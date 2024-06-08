import {
  Box,
  Button,
  Image,
  Spinner,
  AbsoluteCenter,
  Divider
} from '@chakra-ui/react'
import LogoUFPS from '../components/Logos/LogoUFPS'
import LoginGoogle from '../components/ButtonGoogle'
import useUser from '../hooks/useUser'
import { Link } from 'wouter'

function Login () {
  const { user, loading } = useUser()

  return (
    <>
      <Box>
        <Image
          src="/assets/auditorio.jpg"
          pos="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={-1}
          w="full"
          h="100vh"
          objectFit="cover"
        />
      </Box>

      <Box
        h="100vh"
        display="grid"
        placeItems="center"
        className="animate__fadeIn"
      >
        {loading
          ? (
          <Spinner color="white" size="xl" />
            )
          : (
          <Box
            w="50%"
            py={10}
            gap={4}
            color="white"
            display="flex"
            bgColor="white"
            flexDir="column"
            alignItems="center"
            borderRadius="10px"
            justifyContent="center"
          >
            <LogoUFPS width={'40%'} />
            {user
              ? (
              <Button colorScheme="primary" as={Link} href="/home">
                Ir al inicio
              </Button>
                )
              : (
              <>
                <Button
                  colorScheme="primary"
                  as={Link}
                  href="/login-super-user"
                >
                  Ingresar con correo electronico
                </Button>
                <Box position="relative" padding="2" px={10} w="60%">
                  <Divider borderColor="gray.400" />
                  <AbsoluteCenter bg="white" color="black" px="4">
                    o
                  </AbsoluteCenter>
                </Box>
                <LoginGoogle />
              </>
                )}
          </Box>
            )}
      </Box>
    </>
  )
}

export default Login
