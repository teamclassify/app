import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Stack,
  Text, useToast
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import UsersService from '../../services/api/UsersService.js'

function DrawerUser ({ isOpen, onClose, user, queryId }) {
  const queryClient = useQueryClient()
  const toast = useToast()

  const [roles] = useState(['usuario', 'admin', 'soporte_tecnico'])
  const [rolesIds] = useState([1, 2, 0])
  const [checkedItems, setCheckedItems] = useState([])

  const { mutate } = useMutation(
    (newRols) => {
      const promise = UsersService.updateRols(user.id, newRols)

      toast.promise(promise, {
        success: { title: 'Roles del usuario actualizados.' },
        error: { title: 'Error al actualizar los roles del usuario.' },
        loading: { title: 'Actualizando los roles del usuario.' }
      })

      return promise
    },
    {
      onSuccess: () => {
        queryClient.fetchQuery(queryId)
        onClose()
      }
    }
  )

  useEffect(() => {
    setCheckedItems(roles.map((role) => user?.rol.split(',').includes(role)))
  }, [user, roles])

  const handleSave = () => {
    const newRoles = rolesIds.filter((rol, index) => {
      return checkedItems[index]
    })
    console.log(newRoles)
    mutate(newRoles)
  }

  return (
    <>
      <Drawer size="md" isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Definir roles</DrawerHeader>

          <DrawerBody>
            {user && (
              <>
                <Flex mb={4} gap={4} alignItems="center">
                  <Avatar src={user.photo} alt={user.nombre} />

                  <Box>
                    <Text fontWeight="bold">{user.nombre}</Text>
                    <Text mb={2}>{user.correo}</Text>
                  </Box>
                </Flex>

                <Heading as="h3" size="sm">
                  Roles
                </Heading>

                <Stack pl={2} mt={2} spacing={1}>
                  {roles?.map((rol, index) => {
                    return (
                      <Checkbox
                        key={rol}
                        isDisabled={rol === 'usuario'}
                        isChecked={checkedItems[index]}
                        onChange={(e) => {
                          setCheckedItems((prevState) => {
                            const copyPrevState = [...prevState]
                            copyPrevState[index] = e.target.checked
                            return copyPrevState
                          })
                        }}
                        textTransform='uppercase'
                      >
                        {rol.replaceAll('_', ' ')}
                      </Checkbox>
                    )
                  })}
                </Stack>
              </>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancelar
            </Button>

            <Button colorScheme="primary" onClick={handleSave}>Guardar</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default DrawerUser
