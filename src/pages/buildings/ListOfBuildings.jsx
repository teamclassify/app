import { Alert, AlertTitle, Center, Grid, Spinner, useDisclosure, useToast } from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import BuildingsService from '@/services/api/BuildingsService'
import { useState } from 'react'
import BuildingItem from './BuildingItem'
import ModalEditBuilding from './ModalEditBuilding'

function ListOfBuildings () {
  const [currentBuilding, setCurrentBuilding] = useState({ id: 0, name: '' })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isLoading, data } = useQuery('buildings', BuildingsService.getAll)

  const queryClient = useQueryClient()
  const toast = useToast()

  const { mutate } = useMutation(id => {
    const promise = BuildingsService.remove(id)

    toast.promise(promise, {
      success: { title: 'Edificio eliminado' },
      error: { title: 'Error al eliminar' },
      loading: { title: 'Eliminando' }
    })

    return promise
  }, {
    onSuccess: () => {
      queryClient.fetchQuery(['buildings'])
    }
  })

  const handleDelete = (id) => {
    mutate(id)
  }

  const handleUpdate = (data) => {
    setCurrentBuilding(data)
    onOpen()
  }

  if (!isLoading && data.error) {
    return (
      <Alert status="error">
        <AlertTitle>Error al obtener los edificios</AlertTitle>
      </Alert>
    )
  }

  if (!isLoading && !data) {
    return (
      <Alert status="info">
        <AlertTitle>No existen edificios</AlertTitle>
      </Alert>
    )
  }

  return (
    <Grid>
      <ModalEditBuilding currentBuilding={currentBuilding} isOpen={isOpen} onClose={onClose} />

      {isLoading
        ? (
        <Center my={4}>
          <Spinner size="md" />
        </Center>
          )
        : (
        <>
          {data && data.map((building) => (
            <BuildingItem
              key={building.id}
              id={building.id}
              name={building.nombre}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          ))}
        </>
          )}
    </Grid>
  )
}

export default ListOfBuildings
