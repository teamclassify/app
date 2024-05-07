import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  VStack,
  useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import Modal from '@/components/Modal'
import RoomsService from '@/services/api/RoomsService'
import SelectBuildings from './SelectBuildings'

function ModalNewRoom ({ isOpen, onClose }) {
  const [name, setName] = useState('')
  const [capacity, setCapacity] = useState(0)
  const [computers, setComputers] = useState(0)
  const [currentBuilding, setCurrentBuilding] = useState(null)

  const queryClient = useQueryClient()
  const toast = useToast()

  const { isLoading, mutate } = useMutation(
    (newRoom) => {
      const promise = RoomsService.create(newRoom)

      toast.promise(promise, {
        success: { title: 'Sala creada' },
        error: { title: 'Error al crear' },
        loading: { title: 'Creando' }
      })

      return promise
    },
    {
      onSuccess: () => {
        setName('')
        onClose()

        queryClient.fetchQuery(['rooms', currentBuilding])
      }
    }
  )

  const handleSubmit = () => {
    if (!currentBuilding) return

    mutate({
      nombre: name,
      capacidad: capacity,
      edificio_id: currentBuilding,
      cantidad_computadores: computers
    })
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Nueva sala">
        <VStack alignItems="stretch">
          <FormControl>
            <FormLabel>Nombre</FormLabel>
            <Input
              value={name}
              placeholder="Nombre"
              onChange={(evt) => setName(evt.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Edificio</FormLabel>
            <SelectBuildings
              currentBuilding={currentBuilding}
              setCurrentBuilding={setCurrentBuilding}
            />
          </FormControl>

          <Flex gap={2}>
            <FormControl>
              <FormLabel>Capacidad</FormLabel>
              <NumberInput
                min={0}
                value={capacity}
                placeholder="Capacidad"
                onChange={(val) => setCapacity(val)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl>
              <FormLabel># Computadores</FormLabel>
              <NumberInput
                min={0}
                value={computers}
                placeholder="# Computadores"
                onChange={(val) => setComputers(val)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </Flex>

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

export default ModalNewRoom
