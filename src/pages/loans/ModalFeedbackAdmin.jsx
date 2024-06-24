import {
  Button,
  FormControl,
  FormLabel,
  ModalFooter,
  VStack,
  Text,
  Badge,
  Spinner
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import Modal from '@/components/Modal'
import { useQuery } from 'react-query'
import FeedbackService from '../../services/api/FeedbackService.js'
import Rating from '../../components/Rating.jsx'

function ModalEditLoan ({ currentLoan, isOpen, onClose, userLoan }) {
  const [username, setUsername] = useState('')
  const [feedback, setFeedback] = useState('')
  const [stars, setStars] = useState('')
  const [userType, setUserType] = useState('estudiante')

  const { isLoading, data } = useQuery(['feedback', currentLoan], () => {
    return FeedbackService.getByLoan(currentLoan?.id)
  })

  useEffect(() => {
    setUsername(data?.data?.usuario_nombre || '')
    setFeedback(data?.data?.comentario || '')
    setStars(data?.data?.valoracion || 1)
    setUserType(data?.data?.usuario_tipo || 'estudiante')
  }, [data])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Feedback">
        {isLoading
          ? (
          <Spinner />
            )
          : (
          <VStack alignItems="stretch">
            {data?.data
              ? (
              <>
                <FormControl>
                  <FormLabel>Retroalimentación del usuario</FormLabel>
                  <Text>{username}</Text>
                  <Text>{data?.data?.usuario_correo}</Text>
                  <Badge colorScheme={'blue'}>{userType}</Badge>
                </FormControl>

                {stars && (
                  <>
                    <Text>Nivel de Satisfacción</Text>
                    <Rating stars={stars} onRatingChange={() => {}} />
                  </>
                )}

                {feedback && (
                  <FormControl mt={2}>
                    <FormLabel>Feedback</FormLabel>
                    <Text>{feedback}</Text>
                  </FormControl>
                )}

                <ModalFooter px={0}>
                  <Button size="sm" colorScheme="primary" onClick={onClose}>
                    Volver
                  </Button>
                </ModalFooter>
              </>
                )
              : (
              <Text mb={4}>No existe feeddback por el momento</Text>
                )}
          </VStack>
            )}
      </Modal>
    </>
  )
}

export default ModalEditLoan
