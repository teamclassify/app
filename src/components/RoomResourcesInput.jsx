import {
  Alert,
  AlertTitle,
  FormControl,
  FormLabel,
  Spinner,
  Stack,
  Text
} from '@chakra-ui/react'
import { useQuery } from 'react-query'

import RoomResourcesService from '../services/api/RoomResourcesService'

function RoomResourcesInput ({ roomId, resources, setResources }) {
  const { isLoading, data } = useQuery(['room-resources', roomId], () =>
    RoomResourcesService.getAllByRoom('activo=true', roomId)
  )

  if (!isLoading && data.error) {
    return (
      <Alert status="error">
        <AlertTitle>Error al obtener los recursos de salas.</AlertTitle>
      </Alert>
    )
  }

  if (!isLoading && !data) {
    return (
      <Alert status="info">
        <AlertTitle>No existen recursos de salas.</AlertTitle>
      </Alert>
    )
  }

  return (
    <FormControl>
      <FormLabel>Recursos disponibles de la sala</FormLabel>

      {isLoading
        ? (
        <Spinner />
          )
        : (
        <Stack spacing={5} direction="row">
          {data && data?.data?.length > 0
            ? (
                data?.data?.map((resource) => {
                  return (
                <Text
                  key={resource.id}
                  colorScheme="green"
                  // defaultChecked={resources.includes(resource.nombre)}
                  // onChange={(evt) => {
                  //   if (evt.target.checked) {
                  //     setResources([...resources, resource.nombre])
                  //   } else {
                  //     setResources(
                  //       resources.filter((r) => r !== resource.nombre)
                  //     )
                  //   }
                  // }}
                >
                  {resource.nombre}
                </Text>
                  )
                })
              )
            : (
            <Text>No existen recursos de salas.</Text>
              )}
        </Stack>
          )}
    </FormControl>
  )
}

export default RoomResourcesInput
