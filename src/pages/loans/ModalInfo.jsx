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
  const [reason, setReason] = useState(currentLoan?.razon || '')
  const [username, setUsername] = useState(userLoan?.username || '')
  const [feedback, setFeedback] = useState(userLoan?.feedback || '')

  useEffect(() => {
    setReason(currentLoan?.razon || '')
    setUsername(userLoan?.username || '')
  }, [currentLoan, userLoan])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Editar préstamo">
        <VStack alignItems="stretch">
          <FormControl>
            <FormLabel>Usuario</FormLabel>
            <Flex align="center">
              <Text>{username}</Text>
            </Flex>
          </FormControl>
          <FormControl>
            <FormLabel>Razón de el préstamo</FormLabel>
            <Textarea
              placeholder="..."
              value={reason}
              onChange={(evt) => setReason(evt.target.value)}
            />
            <FormControl>
            <FormLabel>Feedback</FormLabel>
            <Textarea
              placeholder="..."
              value={feedback}
              onChange={(evt) => setFeedback(evt.target.value)}
            />
          </FormControl>
          </FormControl>

          <ModalFooter px={0}>
            <Button
              size="sm"
              colorScheme="primary"
              onClick={onClose} // Cerrar modal al hacer clic en "Volver"
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
