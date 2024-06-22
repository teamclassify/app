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
  useToast,
  Textarea,
  Input,
  Select,
  Flex
} from '@chakra-ui/react'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { IoIosSend } from 'react-icons/io'

import Modal from '@/components/Modal'
import LoansService from '@/services/api/LoansService'
import RoomResourcesInput from './RoomResourcesInput.jsx'
import { useLocation } from 'wouter'
import useUser from '../hooks/useUser.js'
import { convertHour12h } from '../utils/date.js'

const AVAILABLE_HOURS = [
  6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22
]

function ModalNewLoan ({ data, isOpen, onClose }) {
  const { user } = useUser()
  const [, setLocation] = useLocation()

  const [reason, setReason] = useState('')
  const [people, setPeople] = useState(1)
  const [resources, setResources] = useState([])

  const toast = useToast()

  const { isLoading, mutate } = useMutation(
    (newLoan) => {
      return LoansService.create(newLoan)
    },
    {
      onSuccess: (res) => {
        if (res.success) {
          setLocation(`/prestamo-solicitado/${res.data.id}`)
        } else {
          toast({
            title: 'Error',
            description: res.message,
            status: 'error',
            duration: 5000,
            isClosable: true
          })
        }
      }
    }
  )

  const handleSubmit = () => {
    mutate({
      fecha: data.date,
      sala_id: data.currentRoom.id,
      hora_inicio: data.startHour,
      hora_fin: data.endHour,
      cantidad_personas: people,
      recursos: resources.toString(),
      razon: reason,
      email: user.email
    })
  }
  
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Nuevo préstamo">
        <VStack alignItems="stretch">
          <FormControl w="full">
            <FormLabel>Lugar</FormLabel>
            <Input
              type="text"
              value={
                data?.currentRoom?.edificio + '-' + data?.currentRoom?.nombre
              }
              isDisabled
            />
          </FormControl>

          <Flex gap={2} w="full">
            <FormControl w="full">
              <FormLabel>Fecha</FormLabel>
              <Input type="date" value={data?.date} isDisabled />
            </FormControl>

            <FormControl w="full">
              <FormLabel>Hora Inicio</FormLabel>
              <Select value={data.startHour} isDisabled>
                {AVAILABLE_HOURS.map((hour) => {
                  return (
                    <option value={hour} key={hour}>
                      {convertHour12h(hour).toUpperCase()}
                    </option>
                  )
                })}
              </Select>
            </FormControl>

            <FormControl w="full">
              <FormLabel>Hora Fin</FormLabel>
              <Select value={data.endHour} isDisabled>
                {AVAILABLE_HOURS.map((hour) => {
                  return (
                    <option value={hour} key={hour}>
                      {convertHour12h(hour).toUpperCase()}
                    </option>
                  )
                })}
              </Select>
            </FormControl>
          </Flex>

          <FormControl>
            <FormLabel>Personas</FormLabel>

            <NumberInput value={people} onChange={(val) => setPeople(val)}>
              <NumberInputField placeholder="¿Cuantas personas asistiran?" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <RoomResourcesInput
            roomId={data?.currentRoom?.id}
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
              isLoading={isLoading}
              leftIcon={<IoIosSend />}
            >
              Enviar petición
            </Button>
          </ModalFooter>
        </VStack>
      </Modal>
    </>
  )
}

export default ModalNewLoan
