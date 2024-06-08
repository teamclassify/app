import {
  Button,
  FormControl,
  FormLabel,
  ModalFooter,
  VStack,
  useToast,
  Textarea
} from '@chakra-ui/react'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import Modal from '@/components/Modal'
import LoansService from '@/services/api/LoansService'

function ModalCancelLoan ({
  currentLoan,
  isOpen,
  onClose,
  filterState,
  filterReason
}) {
  const [reason, setReason] = useState('')

  const queryClient = useQueryClient()
  const toast = useToast()

  const { isLoading, mutate } = useMutation(
    (data) => {
      const promise = LoansService.update(data.id, {
        estado: 'CANCELADO',
        razon_cancelacion: data.reason
      })

      toast.promise(promise, {
        success: { title: 'Préstamo cancelado' },
        error: { title: 'Error al cancelar el préstamo' },
        loading: { title: 'Cancelando préstamo' }
      })

      return promise
    },
    {
      onSuccess: () => {
        queryClient.fetchQuery(['loans', filterState, filterReason])
        onClose()
        setReason('')
      }
    }
  )

  const handleSubmit = () => {
    if (reason.trim().length <= 0) {
      toast({
        title: 'Error',
        description: 'Debes colocar una razón para la cancelación del préstamo',
        status: 'error',
        duration: 5000,
        isClosable: true
      })

      return
    }

    mutate({
      id: currentLoan.id,
      reason
    })
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Cancelar préstamo">
        <VStack alignItems="stretch">
          <FormControl>
            <FormLabel>Razón de la cancelación</FormLabel>
            <Textarea
              placeholder="..."
              value={reason}
              onChange={(evt) => setReason(evt.target.value)}
            />
          </FormControl>

          <ModalFooter px={0}>
            <Button
              size="sm"
              colorScheme="primary"
              onClick={handleSubmit}
              isDisabled={isLoading}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </VStack>
      </Modal>
    </>
  )
}

export default ModalCancelLoan
