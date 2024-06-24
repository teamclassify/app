import {
  Button,
  FormControl,
  FormLabel,
  ModalFooter,
  VStack,
  Textarea,
  Flex,
  Text
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import Modal from '@/components/Modal'

function ModalEditLoan ({ currentLoan, isOpen, onClose, userLoan }) {
  const [username, setUsername] = useState(userLoan?.username || '')
  const [feedback, setFeedback] = useState(userLoan?.feedback || '')

  useEffect(() => {
    setUsername(userLoan?.username || '')
    setFeedback(userLoan?.feedback || '')
  }, [userLoan])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Editar préstamo">
        <VStack alignItems="stretch">
          <FormControl>
            <FormLabel>Retroalimentación del usuario</FormLabel>
            <Flex align="center">
              <Text>{username}</Text>
            </Flex>
          </FormControl>

          {feedback && (
            <FormControl>
              <FormLabel>Feedback</FormLabel>
              <Textarea
                placeholder="..."
                value={feedback || ''}
                onChange={(evt) => setFeedback(evt.target.value)}
              />
            </FormControl>
          )}

          <ModalFooter px={0}>
            <Button
              size="sm"
              colorScheme="primary"
              onClick={onClose}
            >
              Volver
            </Button>
          </ModalFooter>
        </VStack>
      </Modal>
    </>
  )
}

export default ModalEditLoan
