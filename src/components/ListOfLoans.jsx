import { Alert, AlertTitle, Center, SimpleGrid, Spinner } from '@chakra-ui/react'
import { useQuery } from 'react-query'

import LoansService from '@/services/api/LoansService'
import Loan from './Loan'

function ListOfLoans () {
  const { isLoading, data } = useQuery('loans', LoansService.getAll)

  if (!isLoading && data.error) {
    return (
      <Alert status="error">
        <AlertTitle>Error al obtener los prestamos</AlertTitle>
      </Alert>
    )
  }

  if (!isLoading && !data) {
    return (
      <Alert status="info">
        <AlertTitle>No existen prestamos</AlertTitle>
      </Alert>
    )
  }

  return (
    <SimpleGrid display="flex" flexDirection="row" spacing="4" mt="10px">
      {isLoading
        ? (
        <Center my={4}>
          <Spinner size="md" />
        </Center>
          )
        : (
        <>
          {data && data.map((loan) => (
            <Loan
              key={loan.id}
              state={loan.estado}
              date={loan.fecha}
              loanroom={loan.sala_id}
            />
            /* "id":25,"usuario_id":16,"razon":"Charla de React","estado":"pendiente","hora_inicio":6,"hora_fin":8,"fecha":"2024-05-09","cantidad_personas":4,"sala_id":285,"createdAt":"2024-05-08","updatedAt":"2024-05-08" */
          ))}
        </>
          )}
    </SimpleGrid>
  )
}

export default ListOfLoans
