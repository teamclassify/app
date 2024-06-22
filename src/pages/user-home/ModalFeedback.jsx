import {
  Button,
  FormControl,
  FormLabel,
  ModalFooter,
  VStack,
  useToast,
  Textarea
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import Modal from '@/components/Modal'
import LoansService from '@/services/api/LoansService'

function ModalEditLoan ({ currentLoan, isOpen, onClose }) {
  const [feedback, setFeedback] = useState(1)

  const queryClient = useQueryClient()
  const toast = useToast()

  const { isLoading, mutate } = useMutation(
    (data) => {
      const promise = LoansService.update(data.id, data.data)

      toast.promise(promise, {
        success: { title: 'Retroalomentación guardada' },
        error: { title: 'Error al guardar retroalimentación' },
        loading: { title: 'Actualizando' }
      })

      return promise
    },
    {
      onSuccess: () => {
        queryClient.fetchQuery(['my-loans'])
        onClose()
      }
    }
  )

  const handleSubmit = () => {
    mutate({
      id: currentLoan.id,
      data: {
        retroalimentacion: feedback
      }
    })
  }

  useEffect(() => {
    setFeedback(currentLoan.feedback)
  }, [currentLoan.feedback])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Editar préstamo">
        <VStack alignItems="stretch">
          <FormControl>
            <FormLabel>Ayúdanos a mejorar compartiendo tu experiencia</FormLabel>
            <Textarea
              placeholder="..."
              onChange={(evt) => setFeedback(evt.target.value)}
            />
          </FormControl>

          <ModalFooter px={0}>
            <Button
              size="sm"
              colorScheme="primary"
              onClick={handleSubmit}
              isDisabled={isLoading}
            >
              Guardar
            </Button>
          </ModalFooter>
        </VStack>
      </Modal>
    </>
  )
}

export default ModalEditLoan
