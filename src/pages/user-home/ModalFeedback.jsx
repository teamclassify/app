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
import { useMutation } from 'react-query'

import Modal from '@/components/Modal'
import Rating from '../../components/Rating'
import FeedbackService from '../../services/api/FeedbackService.js'

function ModalFeedback ({ currentLoan, isOpen, onClose }) {
  const [feedback, setFeedback] = useState(1)
  const [rating, setRating] = useState()

  const toast = useToast()

  const { isLoading, mutate } = useMutation(
    (data) => {
      const promise = FeedbackService.create(data)

      toast.promise(promise, {
        success: { title: 'Retroalomentación guardada' },
        error: { title: 'Error al guardar retroalimentación' },
        loading: { title: 'Creando...' }
      })

      return promise
    },
    {
      onSuccess: () => {
        onClose()
      }
    }
  )

  const handleSubmit = () => {
    if (!currentLoan) return

    mutate({
      prestamo_id: currentLoan?.id,
      valoracion: rating,
      comentario: feedback
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
          <Rating onRatingChange={setRating} />
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
              isLoading={isLoading}
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
