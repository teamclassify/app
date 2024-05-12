import { Center, Grid, Spinner } from '@chakra-ui/react'
import { useQuery } from 'react-query'

import LoansService from '@/services/api/LoansService'
import LoanItem from './LoanItem'

function ListOfLoans () {
  const { isLoading, data: loans } = useQuery(['loans'], () =>
    LoansService.getAllPending()
  )

  return (
    <Grid>
      {isLoading
        ? (
        <Center my={4}>
          <Spinner size="md" />
        </Center>
          )
        : (
        <Grid gap={2}>
          {loans &&
            loans.data &&
            loans.data.map((loan) => (
              <LoanItem
                key={loan.id}
                id={loan.id}
                state={loan.estado}
                date={loan.fecha}
                loanroom={loan.sala}
                building={loan.edificio}
                reason={loan.razon}
              />
            ))}
        </Grid>
          )}
    </Grid>
  )
}

export default ListOfLoans
