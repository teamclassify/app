import { Center, Grid, Spinner, Text } from '@chakra-ui/react'
import { MdPendingActions } from 'react-icons/md'
import { useQuery } from 'react-query'
import { useState } from 'react'

import AnomaliesService from '@/services/api/AnomaliesService'
import Pagination from '../../components/Pagination.jsx'
import AnomalieItem from './AnomalieItem.jsx'

function ListOfAnomalies (
  { filterState, filterDescription } = {
    filterState: [],
    filterDescription: ''
  }
) {
  const [currentPage, setCurrentPage] = useState(1)

  const { isLoading, data: anomalies } = useQuery(
    ['anomalies', filterState, filterDescription, currentPage],
    () => {
      const valueFilter = filterState
        .filter((f) => f.checked)
        .map((f) => f.value)
      return AnomaliesService.getAll(
        [
          {
            name: 'estado',
            value: valueFilter
          },
          {
            name: 'descripcion',
            value: filterDescription
          }
        ],
        currentPage
      )
    }
  )

  if (!isLoading && anomalies && anomalies?.data?.length === 0) {
    return (
      <Center my={4} minH="70vh" flexDir="column">
        <MdPendingActions size="100px" />
        <Text mt={4}>No hay anomalías para mostrar</Text>
      </Center>
    )
  }

  return (
    <Grid>
      {isLoading
        ? (
        <Center my={4}>
          <Spinner size="md" />
        </Center>
          )
        : (
        <>
          {anomalies && anomalies.data && (
            <>
              <Grid gap={2}>
                {anomalies.data.map((anomalie) => (
                  <AnomalieItem
                    id={anomalie.id}
                    key={anomalie.id}
                    sala={anomalie.sala}
                    estado={anomalie.estado}
                    edificio={anomalie.edificio}
                    descripcion={anomalie.descripcion}
                    usuario_nombre={anomalie.usuario_nombre}
                    usuario_correo={anomalie.usuario_correo}
                    usuario_photo={anomalie.usuario_photo}
                    usuario_tipo={anomalie.usuario_tipo}
                    createdAt={anomalie.createdAt}
                    updatedAt={anomalie.updatedAt}
                    filterState={filterState}
                    filterDescription={filterDescription}
                    page={currentPage}
                  />
                ))}
              </Grid>

              <Pagination
                totalItems={anomalies?.count ?? 0}
                currentPage={currentPage}
                onChangePage={setCurrentPage}
              />
            </>
          )}
        </>
          )}
    </Grid>
  )
}

export default ListOfAnomalies
