import {
  ModalBody,
  Modal as ModalChakra,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'

function Modal ({ title, isOpen, onClose, children, width }) {
  return (
    <ModalChakra isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW={width}>
        <ModalHeader bg="primary.400" color="white" fontSize="md">
          {title}
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody overflow="auto" pt={6}>{children}</ModalBody>
      </ModalContent>
    </ModalChakra>
  )
}

export default Modal
