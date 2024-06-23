import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Divider,
  Grid,
  Heading,
  Input,
  Select,
  Spinner,
  Text,
  useToast
} from '@chakra-ui/react'

import useUser from '../hooks/useUser'
import LoadingUser from '../pages/LoadingUser'
import DrawerMenu from './Drawer'
import { MdOutlineBlock } from 'react-icons/md'
import { useMutation } from 'react-query'
import UsersService from '../services/api/UsersService.js'
import { useEffect, useState } from 'react'
import { verifyEmail } from '../services/firebase/AuthService.js'

function Wrapper ({ children }) {
  const { user, loading } = useUser()
  const toast = useToast()

  const [valueType, setValueType] = useState('')
  const [valueEmail, setValueEmail] = useState('')
  const [isLoadingSendEmail, setIsLoadingSendEmail] = useState(false)

  const { isLoading, mutate } = useMutation((data) => {
    const promise = UsersService.updateInfo(data)

    toast.promise(promise, {
      success: { title: 'Usuario actualizado' },
      error: { title: 'Error al actualizar el usuario' },
      loading: { title: 'Actualizando el usuario...' }
    })

    return promise
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    mutate({
      tipo: valueType
    })
  }

  const handleVerifyEmail = (e) => {
    e.preventDefault()

    setIsLoadingSendEmail(true)
    verifyEmail()
      .then(() => {
        toast({
          title: 'Correo enviado',
          description: 'Revisa tu correo y verificate',
          status: 'success',
          duration: 5000,
          isClosable: true
        })
      })
      .catch((err) => {
        toast({
          title: 'Error al enviar el correo',
          description: err.msg,
          status: 'error',
          duration: 5000,
          isClosable: true
        })
      })
      .finally(() => {
        setIsLoadingSendEmail(false)
      })
  }

  useEffect(() => {
    setValueType(user?.tipo)
    setValueEmail(user?.email)
  }, [user])

  if (loading) {
    return <LoadingUser />
  }

  return (
    <Grid gridTemplateColumns={{ base: '1fr', md: '250px 1fr' }}>
      <DrawerMenu />
      <Box h={0}></Box>

      <Box py={4} px={4} mt={{ base: 10, md: 0 }}>
        {loading
          ? (
          <LoadingUser />
            )
          : (
          <>
            {user?.emailVerified
              ? (
              <>
                {user?.estado === 'ACTIVO'
                  ? (
                  <Box mt={0}>{children}</Box>
                    )
                  : (
                  <Center flexDir={'column'} minH={'calc(100vh - 100px)'}>
                    <MdOutlineBlock size={50} />
                    <Heading my={2} as={'h2'} size={'md'}>
                      Tu usuario no está activo.
                    </Heading>
                    <Box maxW={'md'}>
                      <Text mb={2} textAlign={'center'}>
                        Cuando los administradores activen tu usuario, te
                        enviaremos una notificación por correo electrónico.
                      </Text>

                      <Divider my={4} borderColor={'gray.300'} />

                      {isLoading
                        ? (
                        <Center>
                          <Spinner />
                        </Center>
                          )
                        : (
                        <form onSubmit={handleSubmit}>
                          <Text mb={2} textAlign={'center'}>
                            Mientras puedes definir que tipo de usuario eres
                          </Text>

                          <Box mx={'auto'} maxW={'xs'}>
                            <Select
                              mb={2}
                              bg={'white'}
                              name={'tipo'}
                              value={valueType}
                              onChange={(e) => setValueType(e.target.value)}
                            >
                              <option value={'ESTUDIANTE'}>Estudiante</option>
                              <option value={'DOCENTE'}>Docente</option>
                              <option value={'ADMINISTRATIVO'}>
                                Administrativo
                              </option>
                            </Select>

                            <Button
                              w={'full'}
                              size={'sm'}
                              type={'submit'}
                              colorScheme={'primary'}
                            >
                              Guardar
                            </Button>
                          </Box>
                        </form>
                          )}
                    </Box>
                  </Center>
                    )}
              </>
                )
              : (
              <Center flexDir={'column'} minH={'calc(100vh - 100px)'}>
                <form onSubmit={handleVerifyEmail}>
                  <Card w={'sm'}>
                    <CardHeader pb={0}>
                      <Heading as={'h2'} size={'md'}>
                        Verificar tu correo
                      </Heading>
                    </CardHeader>

                    <CardBody pb={0}>
                      <Text mb={4}>
                        Te enviaremos un correo para verificar tu cuenta al
                        siguiente correo.
                      </Text>

                      <Input
                        isRequired
                        type={'email'}
                        value={valueEmail}
                        isDisabled={isLoadingSendEmail}
                        placeholder={'Correo electronico...'}
                        onChange={(e) => setValueEmail(e.target.value)}
                      />
                    </CardBody>

                    <CardFooter>
                      <Button
                        w={'full'}
                        type={'submit'}
                        colorScheme={'primary'}
                        isLoading={isLoadingSendEmail}
                        isDisabled={isLoadingSendEmail}
                      >
                        Enviar
                      </Button>
                    </CardFooter>
                  </Card>
                </form>
              </Center>
                )}
          </>
            )}
      </Box>
    </Grid>
  )
}

export default Wrapper
