import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button
} from '@chakra-ui/react'
import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'

function ConfirmDialog ({ title, isOpen, onClose, onConfirm }) {
  const cancelRef = React.useRef()

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader bg="primary.400" color="white" fontSize="md">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody pt={6}>
              La eliminación de este recurso es permanente. No podrás
              recuperarlo una vez eliminado.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                size="sm"
                ref={cancelRef}
                onClick={onClose}
                leftIcon={<IoIosArrowBack />}
              >
                Cancelar
              </Button>

              <Button
                ml={3}
                size="sm"
                onClick={onConfirm}
                colorScheme="primary"
                leftIcon={<MdDelete />}
              >
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default ConfirmDialog
