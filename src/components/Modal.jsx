import {
  ModalBody,
  Modal as ModalChakra,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'

function Modal ({ title, isOpen, onClose, children }) {
  return (
    <ModalChakra isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent overflow="hidden">
        <ModalHeader bg="primary.400" color="white" fontSize="md">
          {title}
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody pt={6}>{children}</ModalBody>
      </ModalContent>
    </ModalChakra>
  )
}

export default Modal
