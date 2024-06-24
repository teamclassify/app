import { Center, Grid, Spinner, Text, useDisclosure } from '@chakra-ui/react'
import { MdPendingActions } from 'react-icons/md'
import { useQuery } from 'react-query'
import { useState } from 'react'

import LoansService from '@/services/api/LoansService'
import LoanItem from './LoanItem'
import ModalCancelLoan from './ModalCancelLoan.jsx'
import ModalFeedbackAdmin from './ModalFeedbackAdmin.jsx'
import Pagination from '../../components/Pagination.jsx'

function ListOfLoans (
  { filterState, filterReason } = {
    filterState: [],
    filterReason: ''
  }
) {
  const modalCancel = useDisclosure()
  const modalInfo = useDisclosure()
  const [currentLoan, setCurrentLoan] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  const { isLoading, data: loans } = useQuery(
    ['loans', filterState, filterReason, currentPage],
    () => {
      const valueFilter = filterState
        .filter((f) => f.checked)
        .map((f) => f.value)
      return LoansService.getAll(
        [
          {
            name: 'estado',
            value: valueFilter
          },
          {
            name: 'razon',
            value: filterReason
          }
        ],
        currentPage
      )
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

  const handleInfo = (loan) => {
    setCurrentLoan(loan)
    modalInfo.onOpen()
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
          currentPage={currentPage}
        />
      )}

      {isLoading
        ? (
        <Center my={4}>
          <Spinner size="md" />
        </Center>
          )
        : (
        <>
          {loans && loans.data && (
            <>
              <Grid gap={2}>
                {loans.data.map((loan) => (
                  <LoanItem
                    key={loan.id}
                    id={loan.id}
                    loan={loan}
                    type={loan.tipo}
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
                      username: loan.usuario_username,
                      role: loan.usuario_tipo
                    }}
                    filterState={filterState}
                    filterReason={filterReason}
                    page={currentPage}
                    currentPage={currentPage}
                    handleCancel={handleCancel}
                    handleInfo={handleInfo}
                  />
                ))}
              </Grid>

              <Pagination
                totalItems={loans?.count ?? 0}
                currentPage={currentPage}
                onChangePage={setCurrentPage}
              />
            </>
          )}
        </>
          )}
      <ModalFeedbackAdmin
        isOpen={modalInfo.isOpen}
        onClose={modalInfo.onClose}
        currentLoan={currentLoan}
        filterState={filterState}
        filterReason={filterReason}
        currentPage={currentPage}
      />
    </Grid>
  )
}

export default ListOfLoans
