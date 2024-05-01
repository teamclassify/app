import { Center, Grid, Spinner, useDisclosure, useToast } from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import BuildingsService from '@/services/api/BuildingsService'
import BuildingItem from './BuildingItem'
import ModalEditBuilding from './ModalEditBuilding'
import { useState } from 'react'

function ListOfBuildings () {
  const [currentBuilding, setCurrentBuilding] = useState({ id: 0, name: '' })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isLoading, data: buildings } = useQuery('buildings', BuildingsService.getAll)

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
          {buildings.map((building) => (
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
