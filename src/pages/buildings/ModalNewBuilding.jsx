import { Button, Input, ModalFooter, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import Modal from '@/components/Modal'
import BuildingsService from '@/services/api/BuildingsService'

function ModalNewBuilding ({ isOpen, onClose }) {
  const [name, setName] = useState('')

  const queryClient = useQueryClient()
  const toast = useToast()

  const { isLoading, mutate } = useMutation(
    (newBuilding) => {
      const promise = BuildingsService.create(newBuilding)

      toast.promise(promise, {
        success: { title: 'Edificio creado' },
        error: { title: 'Error al crear' },
        loading: { title: 'Creando' }
      })

      return promise
    },
    {
      onSuccess: () => {
        setName('')
        onClose()

        queryClient.fetchQuery(['buildings'])
      }
    }
  )

  const handleSubmit = () => {
    mutate({ nombre: name })
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Nuevo edificio">
        <Input
          placeholder="Nombre"
          value={name}
          onChange={(evt) => setName(evt.target.value)}
        />

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
      </Modal>
    </>
  )
}

export default ModalNewBuilding
