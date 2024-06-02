import {
  Alert,
  AlertTitle,
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Spinner,
  Text,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import { IoMdTrash } from 'react-icons/io'
import { MdEdit } from 'react-icons/md'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import RoomResourcesService from '@/services/api/RoomResourcesService'
import ConfirmDialog from '../../components/ConfirmDialog'
import ModalEditResource from './ModalEditResource'

function ListOfResources () {
  const [currentResource, setCurrentResource] = useState({
    id: 0,
    nombre: '',
    descripcion: '',
    activo: '',
    img: ''
  })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const diclosureDelete = useDisclosure()
  const queryClient = useQueryClient()
  const toast = useToast()

  const { isLoading, data } = useQuery(
    'room-resources',
    RoomResourcesService.getAll
  )

  const { mutate } = useMutation(
    (id) => {
      const promise = RoomResourcesService.remove(id)

      toast.promise(promise, {
        success: { title: 'Recurso de salas eliminado.' },
        error: { title: 'Error al eliminar el recurso de salas.' },
        loading: { title: 'Eliminando el recurso de salas.' }
      })

      return promise
    },
    {
      onSuccess: () => {
        queryClient.fetchQuery(['room-resources'])
      }
    }
  )

  const handleUpdate = (data) => {
    setCurrentResource(data)
    onOpen()
  }

  const handleConfirmDelete = () => {
    if (!currentResource) return

    mutate(currentResource.id)

    diclosureDelete.onClose()
  }

  if (!isLoading && data.error) {
    return (
      <Alert status="error">
        <AlertTitle>Error al obtener los recursos.</AlertTitle>
      </Alert>
    )
  }

  if (!isLoading && !data) {
    return (
      <Alert status="info">
        <AlertTitle>No existen recursos de salas por el momento.</AlertTitle>
      </Alert>
    )
  }

  return (
    <Box>
      <ModalEditResource
        isOpen={isOpen}
        onClose={onClose}
        currentResource={currentResource}
      />

      <ConfirmDialog
        title="Eliminar recurso de salas"
        isOpen={diclosureDelete.isOpen}
        onClose={diclosureDelete.onClose}
        onConfirm={handleConfirmDelete}
      />

      {isLoading
        ? (
        <Center my={4}>
          <Spinner size="md" />
        </Center>
          )
        : (
        <>
          {data && data.data && data.data.length > 0
            ? (
            <Grid
              w="full"
              gap={2}
              bg="white"
              rounded="md"
              templateColumns="repeat(auto-fill, minmax(15rem, 1fr))"
            >
              {data.data.map((resource) => (
                <Flex
                  p={4}
                  gap={8}
                  w="full"
                  key={resource.id}
                  alignItems="start"
                  borderRightWidth={1}
                >
                  <Box w="full">
                    <Text fontWeight="bold">{resource.nombre}</Text>

                    <Badge
                      mr={2}
                      colorScheme={resource.activo ? 'green' : 'gray'}
                    >
                      {resource.activo ? 'Habilitado' : 'Deshabilitado'}
                    </Badge>
                  </Box>

                  <Flex flexDir="row" gap={1}>
                    <Button
                      size="xs"
                      iconSpacing={0}
                      variant="outline"
                      colorScheme="green"
                      leftIcon={<MdEdit />}
                      onClick={() => handleUpdate(resource)}
                    />

                    <Button
                      size="xs"
                      iconSpacing={0}
                      variant="outline"
                      colorScheme="red"
                      leftIcon={<IoMdTrash />}
                      onClick={() => {
                        diclosureDelete.onOpen()
                        setCurrentResource(resource)
                      }}
                    />
                  </Flex>
                </Flex>
              ))}
            </Grid>
              )
            : (
            <Alert>
              <AlertTitle>
                No existen recursos de salas por el momento.
              </AlertTitle>
            </Alert>
              )}
        </>
          )}
    </Box>
  )
}

export default ListOfResources
