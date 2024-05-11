import {
  Alert,
  AlertTitle,
  Center,
  SimpleGrid,
  Spinner
} from '@chakra-ui/react'
import { useQuery } from 'react-query'

import LoansService from '@/services/api/LoansService'
import Loan from './Loan'

function ListOfLoans () {
  const { isLoading, data } = useQuery('loans', LoansService.getAll)

  if (!isLoading && data.error) {
    return (
      <Alert status="error" rounded="md" mt={4}>
        <AlertTitle>Error al obtener los prestamos</AlertTitle>
      </Alert>
    )
  }

  if (!isLoading && (!data || !data.data || data.data.length === 0)) {
    return (
      <Alert status="info" rounded="md" mt={4}>
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
          {data &&
            data.data &&
            data.data.map((loan) => (
              <Loan
                key={loan.id}
                state={loan.estado}
                date={loan.fecha}
                loanroom={loan.sala_id}
              />
            ))}
        </>
          )}
    </SimpleGrid>
  )
}

export default ListOfLoans
