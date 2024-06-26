import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Image,
  Input,
  Spinner,
  Text,
  useToast
} from '@chakra-ui/react'
import { Link, useLocation } from 'wouter'

import LogoUFPS from '../components/Logos/LogoUFPS'
import useUser from '../hooks/useUser'

function Register () {
  const { loading, registerWithEmail } = useUser()
  const toast = useToast()
  const [, setLocation] = useLocation()

  const handleLogin = async (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value

    if (!email.includes('@ufps.edu.co')) {
      toast({
        title: 'Error al registrarse',
        description: 'Debes usar un correo institucional de la UFPS',
        status: 'error',
        duration: 3000,
        isClosable: true
      })

      return
    }

    registerWithEmail(email, password).then((res) => {
      if (res.status === 200) {
        toast({
          title: 'Registro exitoso',
          description: 'Bienvenido a la plataforma',
          status: 'success',
          duration: 3000,
          isClosable: true
        })

        setLocation('/usuario-registrado')
      } else {
        toast({
          title: 'Error al registrarse',
          description:
            'El correo ya está registrado o la contraseña es muy corta',
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      }
    })
  }

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

              <Box as="form" onSubmit={handleLogin} w="90%" maxW="sm" my={4}>
                <FormControl mb={2}>
                  <FormLabel color="black">Dirección de correo</FormLabel>
                  <Input type="email" color="black" w="100%" isRequired />
                </FormControl>

                <FormControl mb={4}>
                  <FormLabel color="black">Contraseña</FormLabel>
                  <Input type="password" color="black" w="100%" isRequired />
                </FormControl>

                <Button
                  w="full"
                  type="submit"
                  colorScheme="primary"
                  isLoading={loading}
                  isDisabled={loading}
                >
                  Registrarse
                </Button>

                <Text mt={4} textAlign="center" color="black">
                  ¿Yo tienes cuenta? <Link href="/login">Iniciar sesión</Link>
                </Text>
              </Box>
            </Box>
          </Box>
            )}
      </Box>
    </>
  )
}

export default Register
