import {
  Alert,
  AlertTitle,
  FormControl,
  Select,
  Spinner
} from '@chakra-ui/react'
import { useQuery } from 'react-query'

import RoomsService from '@/services/api/RoomsService'

function SelectRooms ({ size, building, currentRoom, handleChange } = { size: 'md' }) {
  const { data, isLoading } = useQuery(['rooms', building], () =>
    RoomsService.getAllByBuilding(building)
  )

  const handleSelect = (e) => {
    handleChange(e.target.value)
  }

  if (isLoading) {
    return <Spinner />
  }

  if (!isLoading && !data) {
    return (
      <Alert status="info" rounded="md">
        <AlertTitle>No existen salas</AlertTitle>
      </Alert>
    )
  }

  if (!isLoading && data.error) {
    return (
      <Alert status="error" rounded="md">
        <AlertTitle>Error al obtener las salas</AlertTitle>
      </Alert>
    )
  }

  return (
    <>
      {data && (
        <FormControl
          width="auto"
          display="flex"
          cursor="pointer"
          alignItems="center"
        >
          <Select
            size={size}
            rounded="md"
            value={currentRoom}
            onChange={handleSelect}
            placeholder="Seleccionar sala"
          >
            {data.map((room) => (
              <option key={room.id} value={room.id}>
                {room.nombre}
              </option>
            ))}
          </Select>
        </FormControl>
      )}
    </>
  )
}

export default SelectRooms
