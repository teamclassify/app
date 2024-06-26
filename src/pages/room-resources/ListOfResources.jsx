import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Image,
  Spinner,
  Text,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import ConfirmDialog from '../../components/ConfirmDialog'
import ModalEditResource from './ModalEditResource'
import RoomResourcesService from '../../services/api/RoomResourcesService.js'
import { GiCancel } from 'react-icons/gi'

function ListOfResources ({ roomId, onOpenModalNew }) {
  const [currentResource, setCurrentResource] = useState({
    id: 0,
    nombre: '',
    descripcion: '',
    activo: '',
    img: ''
  })
  const { isOpen, onClose } = useDisclosure()
  const diclosureDelete = useDisclosure()
  const queryClient = useQueryClient()
  const toast = useToast()

  const { isLoading, data } = useQuery(['room-resources', roomId], () =>
    RoomResourcesService.getAllByRoom(null, roomId)
  )

  const { mutate } = useMutation(
    (id) => {
      const promise = RoomResourcesService.unassignResource(id)

      toast.promise(promise, {
        success: { title: 'Recurso de la sala eliminado' },
        error: { title: 'Error al eliminar el recurso de la sala' },
        loading: { title: 'Eliminando el recurso de la sala...' }
      })

      return promise
    },
    {
      onSuccess: () => {
        queryClient.fetchQuery(['room-resources', roomId])
      }
    }
  )

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
        title="Eliminar recurso de la sala"
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
          {data && (
            <Grid
              w="full"
              bg="white"
              rounded="md"
              templateColumns="repeat(auto-fill, minmax(15rem, 1fr))"
            >
              <Flex
                p={4}
                gap={8}
                w="full"
                minH={'130px'}
                alignItems="center"
                borderRightWidth={1}
                borderBottomWidth={1}
                cursor={'pointer'}
                justifyContent={'center'}
                onClick={onOpenModalNew}
              >
                <IoMdAdd size={40} color={'#444'} />
              </Flex>

              {data?.data?.map((resource) => (
                <Flex
                  p={4}
                  gap={8}
                  w="full"
                  key={resource.id}
                  alignItems="start"
                  borderRightWidth={1}
                  borderBottomWidth={1}
                >
                  <Box w="full">
                    <Image
                      w={'full'}
                      maxH={'150px'}
                      objectFit={'cover'}
                      mb={2}
                      rounded={'md'}
                      src={resource.img || 'https://placehold.co/600x400'}
                      alt={resource.nombre}
                    />

                    <Text fontWeight="bold">{resource.nombre}</Text>
                    <Text fontSize={'sm'} color={'gray.600'}>
                      {resource.descripcion}
                    </Text>
                  </Box>

                  <Flex flexDir="row" gap={1}>
                    <Button
                      size="xs"
                      iconSpacing={0}
                      variant="outline"
                      colorScheme="red"
                      leftIcon={<GiCancel />}
                      onClick={() => {
                        diclosureDelete.onOpen()
                        setCurrentResource(resource)
                      }}
                    />
                  </Flex>
                </Flex>
              ))}
            </Grid>
          )}
        </>
          )}
    </Box>
  )
}

export default ListOfResources
