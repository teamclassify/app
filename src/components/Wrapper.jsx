import {
  Box,
  Button,
  Center,
  Divider,
  Grid,
  Heading,
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

function Wrapper ({ children }) {
  const { user, loading } = useUser()
  const toast = useToast()

  const [valueType, setValueType] = useState('')

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

  useEffect(() => {
    setValueType(user?.tipo)
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
                    Cuando los administradores activen tu usuario, te enviaremos
                    una notificación por correo electrónico.
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
            )}
      </Box>
    </Grid>
  )
}

export default Wrapper
