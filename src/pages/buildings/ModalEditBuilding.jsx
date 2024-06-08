import { Button, Input, ModalFooter, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import Modal from '@/components/Modal'
import BuildingsService from '@/services/api/BuildingsService'

function ModalEditBuilding ({ currentBuilding, isOpen, onClose }) {
  const [name, setName] = useState(currentBuilding?.name || '')

  const queryClient = useQueryClient()
  const toast = useToast()

  const { isLoading, mutate } = useMutation(
    (data) => {
      const promise = BuildingsService.update(data.id, data.data)

      toast.promise(promise, {
        success: { title: 'Edificio actualizado' },
        error: { title: 'Error al actualizar' },
        loading: { title: 'Actualizando' }
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
    mutate({ id: currentBuilding.id, data: { nombre: name } })
  }

  useEffect(() => {
    setName(currentBuilding.name)
  }, [currentBuilding.name])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Editar edificio">
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
            Actualizar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default ModalEditBuilding
