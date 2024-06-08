import {
  Button,
  FormControl,
  FormLabel,
  ModalFooter,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  VStack,
  useToast, Textarea
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import Modal from '@/components/Modal'
import LoansService from '@/services/api/LoansService'
import RoomResourcesInput from '../../components/RoomResourcesInput.jsx'

function ModalEditLoan ({
  currentLoan,
  isOpen,
  onClose
}) {
  const [reason, setReason] = useState(currentLoan?.razon || '')
  const [people, setPeople] = useState(1)
  const [resources, setResources] = useState([])

  const queryClient = useQueryClient()
  const toast = useToast()

  const {
    isLoading,
    mutate
  } = useMutation(
    (data) => {
      const promise = LoansService.update(data.id, data.data)

      toast.promise(promise, {
        success: { title: 'Préstamo actualizado' },
        error: { title: 'Error al actualizar el préstamo' },
        loading: { title: 'Actualizando préstamo' }
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
        razon: reason,
        cantidad_personas: people,
        recursos: resources.toString()
      }
    })
  }

  useEffect(() => {
    setReason(currentLoan.razon)
    setPeople(currentLoan.cantidad_personas)
    setResources(currentLoan.recursos.split(','))
  }, [
    currentLoan.razon,
    currentLoan.cantidad_personas,
    currentLoan.recursos
  ])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Editar préstamo">
        <VStack alignItems="stretch">
          <FormControl>
            <FormLabel>Personas</FormLabel>

            <NumberInput value={people} onChange={(val) => setPeople(val)}>
              <NumberInputField placeholder="¿Cuantas personas asistiran?"/>
              <NumberInputStepper>
                <NumberIncrementStepper/>
                <NumberDecrementStepper/>
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <RoomResourcesInput
            resources={resources}
            setResources={setResources}
          />

          <FormControl>
            <FormLabel>Razón de el préstamo</FormLabel>
            <Textarea
              placeholder="..."
              value={reason}
              onChange={(evt) => setReason(evt.target.value)}
            />
          </FormControl>

          <ModalFooter px={0}>
            <Button
              size="sm"
              colorScheme="primary"
              onClick={handleSubmit}
              isDisabled={isLoading}
            >
              Actualizar
            </Button>
          </ModalFooter>
        </VStack>
      </Modal>
    </>
  )
}

export default ModalEditLoan
