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
import Rating from '../../components/Rating'
import LoansService from '@/services/api/LoansService'

function ModalFeedback ({ currentLoan, isOpen, onClose }) {
  const [feedback, setFeedback] = useState(1)
  const [rating, setRating] = useState()

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
        puntaje: rating,
        retroalimentacion: feedback
      }
    })
  }

  useEffect(() => {
    setRating(currentLoan.puntaje)
    setFeedback(currentLoan.retroalimentacion)
  }, [currentLoan.puntaje, currentLoan.retroalimentacion])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Cuéntanos tu experiencia">
        <VStack alignItems="stretch">
          <FormControl>
            <FormLabel>¡Califica tu experiencia!</FormLabel>
          </FormControl>
            <Rating onRatingChange={setRating}/>
          <FormControl>
            <FormLabel onChange={(evt) => setRating(evt.target.value)}>
              ¿Cual es la razón principal de tu calificación?
            </FormLabel>
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

export default ModalFeedback
