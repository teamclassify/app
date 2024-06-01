import {
  Alert,
  AlertTitle,
  Center,
  Grid,
  SimpleGrid,
  Spinner
} from '@chakra-ui/react'
import { useQuery } from 'react-query'

import LoansService from '@/services/api/LoansService'
import Loan from './Loan'

function ListOfLoans () {
  const { isLoading, data } = useQuery('my-loans', () => LoansService.getAllByUser())

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
        <Grid
          w="full"
          gap={2}
          templateColumns="repeat(auto-fill, minmax(10rem, 1fr))"
        >
          {data &&
            data.data &&
            data.data.map((loan) => (
              <Loan
                key={loan.id}
                id={loan.id}
                state={loan.estado}
                date={loan.fecha}
                loanroom={loan.sala}
                building={loan.edificio}
                startHour={loan.hora_inicio}
                endHour={loan.hora_fin}
              />
            ))}
        </Grid>
          )}
    </SimpleGrid>
  )
}

export default ListOfLoans
