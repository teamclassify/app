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
import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import Modal from '@/components/Modal'
import RoomsService from '@/services/api/RoomsService'

function ModalEditRoom ({ currentRoom, isOpen, onClose }) {
  const [name, setName] = useState(currentRoom?.nombre || '')
  const [capacity, setCapacity] = useState(currentRoom?.capacidad || 0)
  const [computers, setComputers] = useState(
    currentRoom?.cantidad_computadores || 0
  )

  const queryClient = useQueryClient()
  const toast = useToast()

  const { isLoading, mutate } = useMutation(
    (data) => {
      const promise = RoomsService.update(data.id, data.data)

      toast.promise(promise, {
        success: { title: 'Sala actualizada' },
        error: { title: 'Error al actualizar' },
        loading: { title: 'Actualizando' }
      })

      return promise
    },
    {
      onSuccess: () => {
        setName('')
        onClose()

        queryClient.fetchQuery(['rooms'])
      }
    }
  )

  const handleSubmit = () => {
    mutate({
      id: currentRoom.id,
      data: {
        nombre: name,
        capacidad: capacity,
        cantidad_computadores: computers
      }
    })
  }

  useEffect(() => {
    setName(currentRoom.nombre)
    setCapacity(currentRoom.capacidad)
    setComputers(currentRoom.cantidad_computadores)
  }, [currentRoom.nombre, currentRoom.capacidad, currentRoom.cantidad_computadores])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Editar sala">
        <VStack alignItems="stretch">
          <FormControl>
            <FormLabel>Nombre</FormLabel>
            <Input
              value={name}
              placeholder="Nombre"
              onChange={(evt) => setName(evt.target.value)}
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
              Actualizar
            </Button>
          </ModalFooter>
        </VStack>
      </Modal>
    </>
  )
}

export default ModalEditRoom
