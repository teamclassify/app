import {
  Center,
  Grid,
  Spinner,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import RoomsService from '@/services/api/RoomsService'
import ModalEditRoom from './ModalEditRoom'
import RoomItem from './RoomItem'
import ConfirmDialog from '../../components/ConfirmDialog'

function ListOfRooms ({ currentBuilding }) {
  const [currentRoom, setCurrentRoom] = useState({ id: 0, nombre: '' })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const diclosureDelete = useDisclosure()
  const { isLoading, data: rooms } = useQuery(['rooms', currentBuilding], () =>
    RoomsService.getAllByBuilding(currentBuilding)
  )

  const queryClient = useQueryClient()
  const toast = useToast()

  const { mutate } = useMutation(
    (id) => {
      const promise = RoomsService.remove(id)

      toast.promise(promise, {
        success: { title: 'Sala eliminada' },
        error: { title: 'Error al eliminar' },
        loading: { title: 'Eliminando' }
      })

      return promise
    },
    {
      onSuccess: () => {
        queryClient.fetchQuery(['rooms', currentBuilding])
      }
    }
  )

  const handleDelete = () => {
    if (!currentRoom) return

    mutate(currentRoom.id)

    diclosureDelete.onClose()
  }

  const handleUpdate = (data) => {
    setCurrentRoom(data)
    onOpen()
  }

  return (
    <Grid>
      <ModalEditRoom
        isOpen={isOpen}
        onClose={onClose}
        currentRoom={currentRoom}
      />

      <ConfirmDialog
        title="Eliminar sala"
        isOpen={diclosureDelete.isOpen}
        onClose={diclosureDelete.onClose}
        onConfirm={handleDelete}
      />

      {isLoading
        ? (
        <Center my={4}>
          <Spinner size="md" />
        </Center>
          )
        : (
        <>
          {rooms &&
            rooms.map((room) => (
              <RoomItem
                key={room.id}
                name={room.nombre}
                handleUpdate={() => handleUpdate(room)}
                handleDelete={() => {
                  diclosureDelete.onOpen()
                  setCurrentRoom(room)
                }}
              />
            ))}
        </>
          )}
    </Grid>
  )
}

export default ListOfRooms
