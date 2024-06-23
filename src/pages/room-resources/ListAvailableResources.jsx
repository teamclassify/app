import {
  Alert,
  AlertTitle,
  Box,
  Center,
  Select,
  Spinner,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import ConfirmDialog from '../../components/ConfirmDialog'
import ModalEditResource from './ModalEditResource'
import RoomResourcesService from '../../services/api/RoomResourcesService.js'

function ListAvailableResources ({ value, onChange }) {
  const [currentResource] = useState({
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

  const { isLoading, data } = useQuery(['room-resources-all'], () =>
    RoomResourcesService.getAll(null)
  )

  const { mutate } = useMutation(
    (id) => {
      const promise = RoomResourcesService.remove(id)

      toast.promise(promise, {
        success: { title: 'Recurso eliminado.' },
        error: { title: 'Error al eliminar el recurso.' },
        loading: { title: 'Eliminando el recurso.' }
      })

      return promise
    },
    {
      onSuccess: () => {
        queryClient.fetchQuery(['room-resources-all'])
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
        <AlertTitle>No existen recursos por el momento.</AlertTitle>
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
            <Select
              defaultValue={'null'}
              onChange={(e) => onChange(e.target.value)}
            >
              <option value={'null'} disabled>
                Ninguno
              </option>

              {data.data.map((resource) => (
                <option value={resource.id} key={resource.id}>
                  {resource.nombre}
                </option>
              ))}
            </Select>
              )
            : (
            <Alert>
              <AlertTitle>No existen recursos por el momento.</AlertTitle>
            </Alert>
              )}
        </>
          )}
    </Box>
  )
}

export default ListAvailableResources
