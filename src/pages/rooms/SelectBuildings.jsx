import {
  Alert,
  AlertTitle,
  FormControl,
  Select,
  Spinner
} from '@chakra-ui/react'
import { useQuery } from 'react-query'

import BuildingsService from '@/services/api/BuildingsService'

function SelectBuildings (
  { size, currentBuilding, setCurrentBuilding } = { size: 'md' }
) {
  const { data, isLoading } = useQuery('buildings', BuildingsService.getAll)

  const handleSelect = (e) => {
    setCurrentBuilding(e.target.value)
  }

  if (isLoading) {
    return <Spinner />
  }

  if (!isLoading && data.error) {
    return (
      <Alert status="error" rounded="md">
        <AlertTitle>Error al obtener los edificios</AlertTitle>
      </Alert>
    )
  }

  if (!isLoading && !data) {
    return (
      <Alert status="info" rounded="md">
        <AlertTitle>No existen edificios</AlertTitle>
      </Alert>
    )
  }

  return (
    <>
      {data && (
        <FormControl
          cursor="pointer"
          width="auto"
          display="flex"
          alignItems="center"
        >
          <Select
            size={size}
            rounded="md"
            value={currentBuilding || ''}
            onChange={handleSelect}
            placeholder="Seleccionar edificio"
          >
            {data.map((building) => (
              <option key={building.id} value={building.id}>
                {building.nombre}
              </option>
            ))}
          </Select>
        </FormControl>
      )}
    </>
  )
}

export default SelectBuildings
