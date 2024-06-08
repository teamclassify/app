import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  VStack,
  useToast
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import Modal from '@/components/Modal'
import RoomResourcesService from '@/services/api/RoomResourcesService'

function ModalEditResource ({ currentResource, isOpen, onClose }) {
  const [name, setName] = useState(currentResource?.nombre || '')
  const [description, setDescription] = useState(
    currentResource?.descripcion || ''
  )
  const [isEnabled, setIsEnabled] = useState(currentResource?.activo || true)

  const queryClient = useQueryClient()
  const toast = useToast()

  const { isLoading, mutate } = useMutation(
    (data) => {
      const promise = RoomResourcesService.update(data.id, data.data)

      toast.promise(promise, {
        success: { title: 'Recurso de salas actualizado' },
        error: { title: 'Error al actualizar el recurso de las salas' },
        loading: { title: 'Actualizando recurso de las salas' }
      })

      return promise
    },
    {
      onSuccess: () => {
        setName('')
        setDescription('')
        setIsEnabled(true)
        onClose()

        queryClient.fetchQuery(['room-resources'])
      }
    }
  )

  const handleSubmit = () => {
    if (!name) {
      toast({
        title: 'Error',
        description: 'Debes colocar un nombre al recurso.',
        status: 'error',
        duration: 5000,
        isClosable: true
      })

      return
    }

    mutate({
      id: currentResource.id,
      data: {
        nombre: name,
        descripcion: description,
        activo: isEnabled
      }
    })
  }

  useEffect(() => {
    setName(currentResource.nombre)
    setDescription(currentResource.descripcion)
    setIsEnabled(currentResource.activo)
  }, [
    currentResource.nombre,
    currentResource.descripcion,
    currentResource.activo
  ])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Editar recurso de salas">
        <VStack alignItems="stretch">
          <FormControl>
            <FormLabel>Nombre</FormLabel>
            <Input
              value={name}
              placeholder="Nombre"
              onChange={(evt) => setName(evt.target.value)}
            />
          </FormControl>

          <FormControl mb={2}>
            <FormLabel>Descripcion</FormLabel>
            <Input
              value={description}
              placeholder="Descripcion"
              onChange={(evt) => setDescription(evt.target.value)}
            />
          </FormControl>

          <FormControl display="flex" alignItems="center">
            <FormLabel mb={1}>Habilitado</FormLabel>
            <Checkbox
              isChecked={isEnabled}
              onChange={(e) => setIsEnabled(e.target.checked)}
            />
          </FormControl>

          <ModalFooter px={0}>
            <Button
              size="sm"
              colorScheme="primary"
              onClick={handleSubmit}
              isDisabled={isLoading}
            >
              Actualizar
            </Button>
          </ModalFooter>
        </VStack>
      </Modal>
    </>
  )
}

export default ModalEditResource
