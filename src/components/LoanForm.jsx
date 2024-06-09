import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Select, Spinner,
  Text,
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaBuilding, FaSearch } from 'react-icons/fa'
import { useMutation } from 'react-query'
import { IoPeople } from 'react-icons/io5'
import { RiComputerLine } from 'react-icons/ri'

import RoomsService from '@/services/api/RoomsService'
import { convertHour12h } from '../utils/date.js'
import ModalNewLoan from './ModalNewLoan.jsx'

const AVAILABLE_HOURS = [
  6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22
]

function MyLoans () {
  const modalNewLoan = useDisclosure()

  const [currentRoom, setCurrentRoom] = useState(null)
  const [error, setError] = useState(null)

  const [startHour, setStartHour] = useState(6)
  const [endHour, setEndHour] = useState(8)
  const [date, setDate] = useState('')

  const mutationAvailableRooms = useMutation((data) => {
    return RoomsService.getAllAvailable(
      data.date,
      data.startHour,
      data.endHour
    )
  })

  const handleChangeStartHour = (e) => {
    const val = parseInt(e.target.value)
    setStartHour(val)

    handleSearch(date, val, endHour)
  }

  const handleChangeEndHour = (e) => {
    const val = parseInt(e.target.value)
    setEndHour(val)

    handleSearch(date, startHour, val)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()

    if (!date || !currentRoom) {
      setError('Debes seleccionar una fecha y una sala.')
      return
    }

    modalNewLoan.onOpen()
  }

  const handleSearch = (date, startHour, endHour) => {
    if (!date) {
      setError('Debes seleccionar una fecha.')
    } else if (new Date(Date.now()).getTime() > new Date(date).getTime()) {
      setError('Debes seleccionar una fecha futura.')
    } else if (endHour < startHour) {
      setError('La hora de inicio debe ser menor que la hora fin.')
    } else if (endHour === startHour) {
      setError('La duracion minima de un evento es de 1 hora.')
    } else {
      setError(null)

      mutationAvailableRooms.mutate({
        date,
        startHour,
        endHour
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <ModalNewLoan
        isOpen={modalNewLoan.isOpen}
        onClose={modalNewLoan.onClose}
        data={{
          date,
          endHour,
          startHour,
          currentRoom
        }}
      />

      <Heading as="h2" size="md" mb={4}>
        Nuevo prestamo
      </Heading>

      <Grid
        gap="4"
        fontWeight="bold"
        color="blackAlpha.700"
        minH="calc(100vh - 110px)"
        gridTemplateColumns={{
          base: '1fr',
          md: '1fr 1.5fr'
        }}
      >
        <GridItem
          p={4}
          rounded={5}
          bg={'white'}
          overflowY="auto"
          maxH="calc(100vh - 110px)"
        >
          <VStack spacing={4} alignItems="start">
            {error && (
              <Alert status="error" rounded="md">
                <AlertIcon />
                <AlertDescription fontSize="sm">{error}</AlertDescription>
              </Alert>
            )}

            <Flex gap={2} w="full">
              <FormControl w="full">
                <FormLabel>Fecha</FormLabel>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value)
                    handleSearch(e.target.value, startHour, endHour)
                  }}
                />
              </FormControl>

              <FormControl w="full">
                <FormLabel>Hora Inicio</FormLabel>
                <Select value={startHour} onChange={handleChangeStartHour}>
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
                <Select value={endHour} onChange={handleChangeEndHour}>
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

            <Button
              size="sm"
              colorScheme="primary"
              onClick={() => handleSearch(date, startHour, endHour)}
              leftIcon={<FaSearch />}
            >
              Buscar
            </Button>
          </VStack>
        </GridItem>

        <GridItem bg={'white'} p={4} rounded={5}>
          {mutationAvailableRooms.isLoading
            ? (
            <Spinner />
              )
            : (
            <>
              {!mutationAvailableRooms.data
                ? (
                <Center h="100%" flexDir="column">
                  <FaBuilding size={100} />
                  <Text mt={4}>
                    Selecciona un fecha y hora para ver las salas disponibles
                  </Text>
                </Center>
                  )
                : (
                <>
                  <Heading as={'h3'} size={'sm'} mb={4}>
                    Lista de salas disponibles
                  </Heading>

                  <Grid
                    maxH={'calc(100vh - 200px)'}
                    templateColumns="repeat(auto-fit, minmax(10rem, 1fr))"
                    gap={4}
                    pb={6}
                    overflowY="auto"
                  >
                    {mutationAvailableRooms.data?.data
                      ?.sort((room) => room.edificio)
                      .map((room) => {
                        return (
                          <Box
                            bg={
                              currentRoom && currentRoom?.id === room.id
                                ? 'green.100'
                                : ''
                            }
                            key={room.id}
                            borderWidth={1}
                            p={4}
                            rounded={'md'}
                            cursor={'pointer'}
                            transition={'all 400ms'}
                            _hover={{
                              bg: 'green.100'
                            }}
                            _active={{
                              bg: 'green.300'
                            }}
                            onClick={() => setCurrentRoom(room)}
                          >
                            <Heading as={'h4'} size={'xs'} mb={1}>
                              {room.edificio} - {room.nombre}
                            </Heading>

                            <Text
                              fontSize={'sm'}
                              display="flex"
                              alignItems="center"
                              gap={2}
                            >
                              <IoPeople /> {room.capacidad}
                            </Text>
                            <Text
                              fontSize={'sm'}
                              display="flex"
                              alignItems="center"
                              gap={2}
                            >
                              <RiComputerLine /> {room.cantidad_computadores}
                            </Text>
                          </Box>
                        )
                      })}
                  </Grid>
                </>
                  )}
            </>
              )}
        </GridItem>
      </Grid>

      <Flex mt={4} justifyContent="end">
        <Button type="submit" colorScheme="primary">
          Confirmar
        </Button>
      </Flex>
    </form>
  )
}

export default MyLoans
