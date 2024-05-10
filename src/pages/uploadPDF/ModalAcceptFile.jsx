import {
  FormControl,
  FormLabel,
  Input,
  VStack
} from '@chakra-ui/react'

import Modal from '@/components/Modal'

function ModalAcceptFile ({ isOpen, onClose }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Nueva sala">
        <VStack alignItems="stretch">
          <FormControl>
            <FormLabel>Nombre</FormLabel>
            <Input/>
          </FormControl>
        </VStack>
      </Modal>
    </>
  )
}

export default ModalAcceptFile
