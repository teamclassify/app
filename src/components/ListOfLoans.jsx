import {
  Alert,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertTitle, Box,
  Button,
  Center, Flex,
  Grid,
  SimpleGrid,
  Spinner,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import LoansService from '@/services/api/LoansService'
import Loan from './Loan'
import React, { useState } from 'react'
import ModalEditLoan from '../pages/user-home/ModalEditLoan.jsx'
import { IoIosArrowBack } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'
import Pagination from './Pagination.jsx'

function ListOfLoans () {
  const cancelRef = React.useRef()
  const queryClient = useQueryClient()
  const toast = useToast()
  const modalEdit = useDisclosure()
  const modalCancel = useDisclosure()

  const [currentLoan, setCurrentLoan] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  const { isLoading, data } = useQuery(['my-loans', currentPage], () =>
    LoansService.getAllByUser(currentPage)
  )

  const { mutate } = useMutation(
    (id) => {
      const promise = LoansService.update(id, { estado: 'CANCELADO' })

      toast.promise(promise, {
        success: { title: 'Préstamo cancelado' },
        error: { title: 'Error al cancelar el préstamo' },
        loading: { title: 'Cancelando préstamo' }
      })

      return promise
    },
    {
      onSuccess: () => {
        queryClient.fetchQuery(['my-loans', currentPage])
        modalCancel.onClose()
      }
    }
  )

  if (!isLoading && data.error) {
    return (
      <Alert status="error" rounded="md" mt={4}>
        <AlertTitle>Error al obtener los préstamos</AlertTitle>
      </Alert>
    )
  }

  if (!isLoading && (!data || !data.data || data.data.length === 0)) {
    return (
      <Alert status="info" rounded="md" mt={4}>
        <AlertTitle>No existen préstamos</AlertTitle>
      </Alert>
    )
  }

  const handleOpenEdit = (loan) => {
    setCurrentLoan(loan)
    modalEdit.onOpen()
  }

  const handleOpenCancel = (loan) => {
    setCurrentLoan(loan)
    modalCancel.onOpen()
  }

  const handleConfirmCancel = () => {
    if (currentLoan) mutate(currentLoan.id)
  }

  return (
    <Box mt="10px">
      {currentLoan && (
        <>
          <ModalEditLoan
            isOpen={modalEdit.isOpen}
            onClose={modalEdit.onClose}
            currentLoan={currentLoan}
          />

          <AlertDialog
            isOpen={modalCancel.isOpen}
            onClose={modalCancel.onClose}
            leastDestructiveRef={cancelRef}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader bg="primary.400" color="white" fontSize="md">
                  Cancelar préstamo
                </AlertDialogHeader>

                <AlertDialogBody pt={6}>
                  La cancelación de este recurso es permanente. No podrás
                  recuperarlo una vez cancelado.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button
                    size="sm"
                    ref={cancelRef}
                    onClick={modalCancel.onClose}
                    leftIcon={<IoIosArrowBack />}
                  >
                    Salir
                  </Button>

                  <Button
                    ml={3}
                    size="sm"
                    onClick={handleConfirmCancel}
                    colorScheme="primary"
                    leftIcon={<MdDelete />}
                  >
                    Cancelar préstamo
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </>
      )}

      {isLoading
        ? (
        <Center my={4}>
          <Spinner size="md" />
        </Center>
          )
        : (
        <>
          {data && data.data && (
            <>
              <Grid
                w="full"
                gap={2}
                templateColumns="repeat(auto-fill, minmax(12rem, 1fr))"
              >
                {data.data.map((loan) => (
                  <>
                    <Loan
                      key={loan.id}
                      id={loan.id}
                      loan={loan}
                      state={loan.estado}
                      date={loan.fecha}
                      loanroom={loan.sala}
                      building={loan.edificio}
                      startHour={loan.hora_inicio}
                      endHour={loan.hora_fin}
                      handleOpenEdit={handleOpenEdit}
                      handleOpenCancel={handleOpenCancel}
                    />
                  </>
                ))}
              </Grid>

              <Flex justifyContent='center'>
                <Pagination
                  totalItems={data?.count ?? 0}
                  currentPage={currentPage}
                  onChangePage={setCurrentPage}
                />
              </Flex>
            </>
          )}
        </>
          )}
    </Box>
  )
}

export default ListOfLoans
