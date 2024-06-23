import {
  Button,
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
import RoomResourcesService from '../../services/api/RoomResourcesService.js'

function ModalEditResource ({ currentResource, isOpen, onClose }) {
  const [name, setName] = useState(currentResource?.nombre || '')
  const [description, setDescription] = useState(
    currentResource?.descripcion || ''
  )
  const [img, setImg] = useState(
    currentResource?.img || 'https://placehold.co/600x400'
  )

  const queryClient = useQueryClient()
  const toast = useToast()

  const { isLoading, mutate } = useMutation(
    (data) => {
      const promise = RoomResourcesService.update(data)

      toast.promise(promise, {
        success: { title: 'Recurso actualizado' },
        error: { title: 'Error al actualizar el recurso' },
        loading: { title: 'Actualizando el recurso...' }
      })

      return promise
    },
    {
      onSuccess: () => {
        setName('')
        setDescription('')
        setImg('')
        onClose()

        queryClient.fetchQuery(['room-resources-all'])
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
      nombre: name,
      descripcion: description,
      img
    })
  }

  useEffect(() => {
    setName(currentResource.nombre)
    setDescription(currentResource.descripcion)
    setImg(currentResource.img)
  }, [
    currentResource.nombre,
    currentResource.descripcion,
    currentResource.img
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

          <FormControl mb={2}>
            <FormLabel>Imagen URL</FormLabel>
            <Input
              value={img}
              placeholder="Imagen URL"
              onChange={(evt) => setImg(evt.target.value)}
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
