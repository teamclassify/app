import {
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  VStack,
  useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import Modal from '@/components/Modal'
import RoomResourcesService from '../../services/api/RoomResourcesService.js'

function ModalNewResource ({ isOpen, onClose }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [img, setImg] = useState('')

  const queryClient = useQueryClient()
  const toast = useToast()

  const { isLoading, mutate } = useMutation(
    (newResource) => {
      const promise = RoomResourcesService.create(newResource)

      toast.promise(promise, {
        success: { title: 'Recurso creado' },
        error: { title: 'Error al crear el recurso' },
        loading: { title: 'Creando el recurso...' }
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
      img,
      nombre: name,
      descripcion: description
    })
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Nuevo recurso">
        <VStack alignItems="stretch">
          <FormControl>
            <FormLabel>Nombre</FormLabel>
            <Input
              value={name}
              placeholder="Nombre"
              onChange={(evt) => setName(evt.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Descripcion</FormLabel>
            <Input
              value={description}
              placeholder="Descripcion"
              onChange={(evt) => setDescription(evt.target.value)}
            />
          </FormControl>

          <ModalFooter px={0}>
            <Button
              size="sm"
              colorScheme="primary"
              onClick={handleSubmit}
              isDisabled={isLoading}
            >
              Guardar
            </Button>
          </ModalFooter>
        </VStack>
      </Modal>
    </>
  )
}

export default ModalNewResource
