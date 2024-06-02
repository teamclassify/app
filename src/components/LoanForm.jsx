import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  Textarea,
  VStack,
  useToast
} from '@chakra-ui/react'
import moment from 'moment'
import { useState } from 'react'
import { FaBuilding } from 'react-icons/fa'
import { useMutation } from 'react-query'
import { useLocation } from 'wouter'

import LoansService from '@/services/api/LoansService'
import SelectBuildings from '../pages/rooms/SelectBuildings'
import SelectRooms from '../pages/rooms/SelectRooms'
import RoomResourcesInput from './RoomResourcesInput'
import Schedule from './Schedule'

function MyLoans () {
  const [currentBuilding, setCurrentBuilding] = useState(null)
  const [currentRoom, setCurrentRoom] = useState(null)
  const [startHour, setStartHour] = useState(null)
  const [endHour, setEndHour] = useState(null)
  const [date, setDate] = useState(null)
  const [people, setPeople] = useState(1)
  const [resources, setResources] = useState([])
  const [reason, setReason] = useState('')

  const toast = useToast()
  const [, setLocation] = useLocation()

  const { isLoading, mutate } = useMutation(
    (newLoan) => {
      const promise = LoansService.create(newLoan)
      return promise
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

  const handleSelectSlot = (slotInfo) => {
    const start = new Date(slotInfo.start).getHours()
    const end = new Date(slotInfo.end).getHours()
    const dayOfWeek = new Date(slotInfo.start).getDay()
    const currentDate = new Date()

    if (dayOfWeek === 0) {
      toast({
        title: 'Error',
        description: 'No se pueden hacer préstamos los domingos',
        status: 'error',
        duration: 5000,
        isClosable: true
      })

      return
    }

    if (start < 6 || end > 22 || start > end || start + 1 > 22) {
      toast({
        title: 'Error',
        description:
          'El horario de prestamo debe ser entre las 6:00 y las 22:00',
        status: 'error',
        duration: 5000,
        isClosable: true
      })

      return
    }

    if (currentDate > new Date(slotInfo.start)) {
      toast({
        title: 'Error',
        description: 'No se pueden hacer préstamos en el pasado',
        status: 'error',
        duration: 5000,
        isClosable: true
      })

      return
    }

    setDate(moment(slotInfo.start).format('YYYY-MM-DD'))
    setStartHour(start)
    setEndHour(start === end ? end + 1 : end)
  }

  const handleChangeStartHour = (val) => {
    if (val < endHour) setStartHour(val)
  }

  const handleChangeEndHour = (val) => {
    if (val > startHour) setEndHour(val)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()

    if (
      !currentBuilding ||
      !currentRoom ||
      !startHour ||
      !endHour ||
      !date ||
      !people ||
      !reason
    ) {
      toast({
        title: 'Error',
        description: 'Completa todos los campos',
        status: 'error',
        duration: 5000,
        isClosable: true
      })

      return
    }

    mutate({
      fecha: date,
      sala_id: currentRoom,
      hora_inicio: startHour,
      hora_fin: endHour,
      cantidad_personas: people,
      recursos: resources.toString(),
      razon: reason
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        gap="4"
        fontWeight="bold"
        color="blackAlpha.700"
        minH="calc(100vh - 110px)"
        gridTemplateColumns={{ base: '1fr', md: '1.5fr 1fr' }}
      >
        <GridItem bg={'white'} p={2} rounded={5}>
          {!currentBuilding
            ? (
            <Center h="100%" flexDir="column">
              <FaBuilding size={100} />
              <Text mt={4}>Selecciona un edificio para ver sus salas</Text>
            </Center>
              )
            : (
            <>
              {!currentRoom
                ? (
                <Center h="100%" flexDir="column">
                  <FaBuilding size={100} />
                  <Text mt={4}>
                    Selecciona una sala para ver su disponibilidad
                  </Text>
                </Center>
                  )
                : (
                <Schedule
                  roomId={currentRoom}
                  isClickable
                  handleSelectSlot={handleSelectSlot}
                />
                  )}
            </>
              )}
        </GridItem>

        <GridItem
          maxH="calc(100vh - 110px)"
          bg={'white'}
          p={4}
          rounded={5}
          overflowY="auto"
        >
          <VStack spacing={4}>
            <Flex gap={2} w="full">
              <FormControl w="full">
                <FormLabel>Edificio</FormLabel>
                <SelectBuildings
                  currentBuilding={currentBuilding}
                  setCurrentBuilding={setCurrentBuilding}
                />
              </FormControl>

              <FormControl w="full">
                <FormLabel>Sala</FormLabel>
                <SelectRooms
                  currentRoom={currentRoom}
                  building={currentBuilding}
                  handleChange={setCurrentRoom}
                />
              </FormControl>
            </Flex>

            {currentBuilding && currentRoom && (
              <Box w="full" borderWidth={1} rounded="md" p={4}>
                {date && (
                  <Text textAlign="left" w="full">
                    Fecha: {moment(date).format('DD MMM YYYY')}
                  </Text>
                )}

                {startHour && endHour
                  ? (
                  <Flex gap={2} w="full">
                    <FormControl w="full">
                      <FormLabel>Hora de Inicio</FormLabel>
                      <NumberInput
                        size="sm"
                        min={6}
                        max={22}
                        value={startHour}
                        onChange={(val) => handleChangeStartHour(val)}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>

                    <FormControl w="full">
                      <FormLabel>Hora de Fin</FormLabel>
                      <NumberInput
                        min={6}
                        max={22}
                        size="sm"
                        value={endHour}
                        onChange={(val) => handleChangeEndHour(val)}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                  </Flex>
                    )
                  : (
                  <Text textAlign="left" w="full">
                    Selecciona una franja horaria
                  </Text>
                    )}
              </Box>
            )}

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
          </VStack>
        </GridItem>
      </Grid>

      <Flex mt={4} justifyContent="end">
        <Button
          colorScheme="primary"
          type="submit"
          isLoading={isLoading}
          isDisabled={isLoading}
        >
          Confirmar
        </Button>
      </Flex>
    </form>
  )
}

export default MyLoans
