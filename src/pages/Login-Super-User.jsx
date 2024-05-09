import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Image,
  Input,
  Spinner
} from '@chakra-ui/react'
import { Link } from 'wouter'

import LogoUFPS from '../components/Logos/LogoUFPS'
import useUser from '../hooks/useUser'

function Login () {
  const { loading } = useUser()

  return (
    <>
      <Box>
        <Image
          src="/assets/ASC4012F.jpg"
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
            position="relative"
            color="white"
            display="flex"
            bgColor="white"
            flexDir="column"
            borderRadius="10px"
          >
            <Box display="flex" justifyContent="start">
              <IconButton
                pos="absolute"
                top={0}
                left={0}
                variant="outline"
                colorScheme="primary"
                aria-label="volver al login"
                m={2}
                as={Link}
                href="/login"
                icon={<ArrowBackIcon />}
              />
            </Box>
            <Box
              display="flex"
              flexDir="column"
              alignItems="center"
              justifyContent="center"
            >
              <LogoUFPS width={'30%'} />

              <Box w="90%" maxW="sm" my={4}>
                <FormControl mb={2}>
                  <FormLabel color="black">Dirección de correo</FormLabel>
                  <Input type="email" color="black" w="100%" />
                </FormControl>

                <FormControl mb={4}>
                  <FormLabel color="black">Contraseña</FormLabel>
                  <Input type="password" color="black" w="100%" />
                </FormControl>

                <Button colorScheme="primary" as={Link} href="/home" w="full">
                  Ingresar
                </Button>
              </Box>
            </Box>
          </Box>
            )}
      </Box>
    </>
  )
}

export default Login
