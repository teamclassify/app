import { Button, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import Modal from '@/components/Modal'
import ListAvailableResources from './ListAvailableResources.jsx'
import RoomResourcesService from '../../services/api/RoomResourcesService.js'

function ModalNewResource ({ isOpen, onClose, roomId }) {
  const [resourceSelected, setResourceSelected] = useState('')

  const queryClient = useQueryClient()
  const toast = useToast()

  const assignResourceMutation = useMutation(
    (data) => {
      const promise = RoomResourcesService.assignResource(data)

      toast.promise(promise, {
        success: { title: 'Recurso asignado a la sala' },
        error: { title: 'Error al asignar el recurso a la sala' },
        loading: { title: 'Asignando el recurso a la sala...' }
      })

      return promise
    },
    {
      onSuccess: () => {
        queryClient.fetchQuery(['room-resources', roomId])

        onClose()
      }
    }
  )

  const handleAssignResource = () => {
    if (!resourceSelected || resourceSelected === 'null' || roomId === null) {
      return
    }

    assignResourceMutation.mutate({
      sala_id: roomId,
      recurso_id: resourceSelected
    })
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Nuevo recurso de salas">
        <ListAvailableResources
          value={resourceSelected}
          onChange={setResourceSelected}
        />

        <Button
          my={2}
          size="sm"
          w={'full'}
          colorScheme="primary"
          onClick={handleAssignResource}
          isLoading={assignResourceMutation.isLoading}
          isDisabled={assignResourceMutation.isLoading}
        >
          Asignar a la sala
        </Button>
      </Modal>
    </>
  )
}

export default ModalNewResource
