import {
  Alert,
  AlertTitle,
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  useDisclosure, useToast
} from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { ChevronDownIcon } from '@chakra-ui/icons'

import UsersService from '@/services/api/UsersService'
import { FaUser, FaUsersCog } from 'react-icons/fa'
import DrawerUser from './DrawerUser.jsx'
import { useState } from 'react'

function ListOfUsers (
  {
    filterState,
    filterName,
    filterRol
  } = {
    filterState: '',
    filterName: '',
    filterRol: ''
  }
) {
  const queryClient = useQueryClient()
  const toast = useToast()

  const {
    isLoading,
    data,
    isRefetching
  } = useQuery(
    ['users', filterState, filterName, filterRol],
    () => {
      return UsersService.getAll([
        {
          name: 'estado',
          value: filterState === 'TODOS' ? '' : filterState
        },
        {
          name: 'nombre',
          value: filterName
        },
        {
          name: 'rol',
          value: filterRol
        }
      ])
    }
  )

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure()
  const [currentUser, setCurrentUser] = useState(null)

  const { mutate } = useMutation(
    (data) => {
      const promise = UsersService.update(data.uid, { estado: data.state })

      toast.promise(promise, {
        success: { title: 'Usuario actualizado.' },
        error: { title: 'Error al actualizar el usuario.' },
        loading: { title: 'Actualizando el usuario.' }
      })

      return promise
    },
    {
      onSuccess: () => {
        queryClient.fetchQuery(['users', filterState, filterName, filterRol])
      }
    }
  )

  const handleToggleUserState = (user) => {
    mutate({
      uid: user.id,
      state: user.estado === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO'
    })
  }

  if (!isLoading && data.error) {
    return (
      <Alert status="error">
        <AlertTitle>Error al obtener los usuarios</AlertTitle>
      </Alert>
    )
  }

  if (!isLoading && (!data?.data || data?.data?.length <= 0)) {
    return (
      <Alert status="info" rounded='md'>
        <AlertTitle>No hay usuarios para mostrar</AlertTitle>
      </Alert>
    )
  }

  return (
    <Grid>
      {currentUser && (
        <DrawerUser isOpen={isOpen} onClose={onClose} user={currentUser}
                    queryId={['users', filterState, filterName, filterRol]}/>
      )}

      {isLoading || isRefetching
        ? (
          <Center my={4}>
            <Spinner size="md"/>
          </Center>
          )
        : (
          <Box bg="white" rounded="md">
            {data &&
              data.data &&
              data.data.map((user) => (
                <Flex
                  p={4}
                  key={user.id}
                  alignItems="center"
                  borderBottomWidth={1}
                  justifyContent="space-between"
                >
                  <Flex gap={4} alignItems="center">
                    <Avatar src={user.photo} alt={user.nombre}/>

                    <Box>
                      <Text fontWeight="bold">{user.nombre}</Text>
                      <Text mb={2}>{user.correo}</Text>

                      <Flex>
                        {user.rol.split(',').map((role) => (
                          <Badge key={role} colorScheme="green" mr={2}>
                            {role}
                          </Badge>
                        ))}
                      </Flex>
                    </Box>
                  </Flex>

                  <Menu>
                    <MenuButton
                      as={Button}
                      size={'sm'}
                      rightIcon={<ChevronDownIcon/>}
                    >
                      Acciones
                    </MenuButton>

                    <MenuList p={0}>
                      <MenuItem icon={<FaUser/>} onClick={() => handleToggleUserState(user)}>
                        {user.estado === 'ACTIVO' ? 'Desactivar usuario' : 'Activar usuario'}
                      </MenuItem>

                      <MenuItem
                        icon={<FaUsersCog/>}
                        onClick={() => {
                          setCurrentUser(user)
                          onOpen()
                        }}
                      >
                        Definir roles
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              ))}
          </Box>
          )}
    </Grid>
  )
}

export default ListOfUsers
