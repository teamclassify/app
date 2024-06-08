import { Center, Grid, Spinner, Text, useDisclosure } from '@chakra-ui/react'
import { MdPendingActions } from 'react-icons/md'
import { useQuery } from 'react-query'

import LoansService from '@/services/api/LoansService'
import LoanItem from './LoanItem'
import ModalCancelLoan from './ModalCancelLoan.jsx'
import { useState } from 'react'

function ListOfLoans (
  { filterState, filterReason } = {
    filterState: [],
    filterReason: ''
  }
) {
  const modalCancel = useDisclosure()
  const [currentLoan, setCurrentLoan] = useState(null)

  const { isLoading, data: loans } = useQuery(
    ['loans', filterState, filterReason],
    () => {
      const valueFilter = filterState
        .filter((f) => f.checked)
        .map((f) => f.value)
      return LoansService.getAll([
        {
          name: 'estado',
          value: valueFilter
        },
        {
          name: 'razon',
          value: filterReason
        }
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

  const handleCancel = (loan) => {
    setCurrentLoan(loan)
    modalCancel.onOpen()
  }

  return (
    <Grid>
      {currentLoan && (
        <ModalCancelLoan
          isOpen={modalCancel.isOpen}
          onClose={modalCancel.onClose}
          currentLoan={currentLoan}
          filterState={filterState}
          filterReason={filterReason}
        />
      )}

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
                loan={loan}
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
                handleCancel={handleCancel}
              />
            ))}
        </Grid>
          )}
    </Grid>
  )
}

export default ListOfLoans
