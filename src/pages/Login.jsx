import { Box, Button, Image, Spinner } from '@chakra-ui/react'
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
          src="/assets/background-red.jpg"
          pos="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={-1}
          w="full"
          h="100vh"
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
            <LogoUFPS />
            {user
              ? (
              <Button colorScheme="primary" as={Link} href="/home">
                Ir al inicio
              </Button>
                )
              : (
              <LoginGoogle />
                )}
          </Box>
            )}
      </Box>
    </>
  )
}

export default Login
