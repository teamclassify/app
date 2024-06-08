import { Center, Grid, Spinner, Text } from '@chakra-ui/react'
import { MdPendingActions } from 'react-icons/md'
import { useQuery } from 'react-query'

import LoansService from '@/services/api/LoansService'
import LoanItem from './LoanItem'

function ListOfLoans (
  { filterState, filterReason } = { filterState: [], filterReason: '' }
) {
  const { isLoading, data: loans } = useQuery(
    ['loans', filterState, filterReason],
    () => {
      const valueFilter = filterState
        .filter((f) => f.checked)
        .map((f) => f.value)
      return LoansService.getAll([
        { name: 'estado', value: valueFilter },
        { name: 'razon', value: filterReason }
      ])
    }
  )

  if (!isLoading && loans && loans?.data?.length === 0) {
    return (
      <Center my={4} minH="70vh" flexDir="column">
        <MdPendingActions size="100px" />
        <Text mt={4}>No hay préstamos para mostrar</Text>
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
                roomId={loan.sala_id}
                building={loan.edificio}
                reason={loan.razon}
                people={loan.cantidad_personas}
                resources={loan.recursos}
                hour={{
                  start: loan.hora_inicio,
                  end: loan.hora_fin
                }}
                user={{
                  name: loan.usuario_nombre,
                  email: loan.usuario_correo,
                  photo: loan.usuario_photo,
                  username: loan.usuario_username
                }}
                filterState={filterState}
                filterReason={filterReason}
              />
            ))}
        </Grid>
          )}
    </Grid>
  )
}

export default ListOfLoans
