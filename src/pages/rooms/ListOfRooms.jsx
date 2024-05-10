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

function ListOfRooms ({ currentBuilding }) {
  const [currentRoom, setCurrentRoom] = useState({ id: 0, nombre: '' })
  const { isOpen, onOpen, onClose } = useDisclosure()
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

  const handleDelete = (id) => {
    mutate(id)
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
                handleDelete={handleDelete}
                handleUpdate={() => handleUpdate(room)}
              />
            ))}
        </>
          )}
    </Grid>
  )
}

export default ListOfRooms
