import {
  Alert,
  AlertTitle,
  Center,
  Grid,
  Spinner,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import BuildingsService from '@/services/api/BuildingsService'
import { useState } from 'react'
import BuildingItem from './BuildingItem'
import ModalEditBuilding from './ModalEditBuilding'
import ConfirmDialog from '../../components/ConfirmDialog'

function ListOfBuildings () {
  const [currentBuilding, setCurrentBuilding] = useState({ id: 0, name: '' })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const diclosureDelete = useDisclosure()
  const { isLoading, data } = useQuery('buildings', BuildingsService.getAll)

  const queryClient = useQueryClient()
  const toast = useToast()

  const { mutate } = useMutation(
    (id) => {
      const promise = BuildingsService.remove(id)

      toast.promise(promise, {
        success: { title: 'Edificio eliminado' },
        error: { title: 'Error al eliminar el edificio' },
        loading: { title: 'Eliminando edificio' }
      })

      return promise
    },
    {
      onSuccess: () => {
        queryClient.fetchQuery(['buildings'])
      }
    }
  )

  const handleDelete = () => {
    if (!currentBuilding) return

    mutate(currentBuilding.id)

    diclosureDelete.onClose()
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
      <ModalEditBuilding
        currentBuilding={currentBuilding}
        isOpen={isOpen}
        onClose={onClose}
      />

      <ConfirmDialog
        title="Eliminar edificio"
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
          {data &&
            data.map((building) => (
              <BuildingItem
                key={building.id}
                id={building.id}
                name={building.nombre}
                handleUpdate={handleUpdate}
                handleDelete={() => {
                  diclosureDelete.onOpen()
                  setCurrentBuilding(building)
                }}
              />
            ))}
        </>
          )}
    </Grid>
  )
}

export default ListOfBuildings
