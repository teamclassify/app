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
  ModalFooter,
  Radio,
  RadioGroup,
  Select,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaBuilding, FaSearch } from 'react-icons/fa'
import { useMutation } from 'react-query'
import { IoPeople, IoTrash, IoWarning } from 'react-icons/io5'
import { RiComputerLine } from 'react-icons/ri'

import RoomsService from '@/services/api/RoomsService'
import { convertHour12h } from '../utils/date.js'
import ModalNewLoan from './ModalNewLoan.jsx'
import { MdOutlineModeEdit } from 'react-icons/md'
import Modal from './Modal.jsx'

const AVAILABLE_HOURS = [
  6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22
]

function MyLoans () {
  const modalNewLoan = useDisclosure()
  const createDiclosure = useDisclosure()

  const [loanType, setLoanType] = useState('UNICO')
  const [currentRoom, setCurrentRoom] = useState(null)
  const [error, setError] = useState(null)

  const [day, setDay] = useState('lunes')
  const [startHour, setStartHour] = useState(6)
  const [endHour, setEndHour] = useState(8)
  const [date, setDate] = useState('')
  const [days, setDays] = useState([])
  const [startDate, setStartDate] = useState(new Date('1-1-2024'))
  const [endDate, setEndDate] = useState(new Date('6-29-2024'))

  const mutationAvailableRooms = useMutation((data) => {
    return loanType === 'UNICO'
      ? RoomsService.getAllAvailable(data.date, data.startHour, data.endHour)
      : RoomsService.getAllAvailableRange(startDate, endDate, data.days)
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

    if ((loanType === 'UNICO' && !date) || !currentRoom) {
      setError('Debes seleccionar una fecha y una sala.')
      return
    }

    modalNewLoan.onOpen()
  }

  const handleSearch = (date, startHour, endHour) => {
    if (loanType === 'UNICO' && !date) {
      setError('Debes seleccionar una fecha.')
    } else if (
      loanType === 'dia' &&
      new Date(Date.now()).getTime() > new Date(date).getTime()
    ) {
      setError('Debes seleccionar una fecha futura.')
    } else if (endHour < startHour) {
      setError('La hora de inicio debe ser menor que la hora fin.')
    } else if (endHour === startHour) {
      setError('La duracion minima de un evento es de 1 hora.')
    } else {
      setError(null)

      if (loanType === 'UNICO') {
        mutationAvailableRooms.mutate({
          date,
          startHour,
          endHour
        })
      } else if (loanType === 'SEMESTRAL') {
        mutationAvailableRooms.mutate({
          days
        })
      }
    }
  }

  const hadleAddDay = () => {
    setDays((prevDays) => {
      return [
        ...prevDays,
        { dia: day, hora_inicio: startHour, hora_fin: endHour }
      ]
    })

    createDiclosure.onClose()
  }

  const handleRemoveDay = (dia) => {
    setDays((prevDays) => {
      return prevDays.filter((day) => day.dia !== dia)
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Modal
        isOpen={createDiclosure.isOpen}
        onClose={createDiclosure.onClose}
        title="Nuevo dia"
      >
        {error && (
          <Alert mb={2} status="error" rounded="md">
            <AlertIcon />
            <AlertDescription fontSize="sm">{error}</AlertDescription>
          </Alert>
        )}

        <VStack alignItems="stretch">
          <FormControl mb={4}>
            <FormLabel>Dia</FormLabel>
            <Select value={day} onChange={(e) => setDay(e.target.value)}>
              <option value={'sabado'}>Sabado</option>
              <option value={'lunes'}>Lunes</option>
              <option value={'martes'}>Martes</option>
              <option value={'miercoles'}>Miercoles</option>
              <option value={'jueves'}>Jueves</option>
              <option value={'viernes'}>Viernes</option>
            </Select>
          </FormControl>

          <Flex gap={2}>
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

          <ModalFooter px={0}>
            <Button size="sm" colorScheme="primary" onClick={hadleAddDay}>
              Añadir
            </Button>
          </ModalFooter>
        </VStack>
      </Modal>

      <ModalNewLoan
        isOpen={modalNewLoan.isOpen}
        onClose={modalNewLoan.onClose}
        data={{
          date,
          endHour,
          startHour,
          currentRoom,
          days,
          loanType,
          fecha_inicio: startDate,
          fecha_fin: endDate
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

            <FormControl w="full">
              <FormLabel>Tipo</FormLabel>
              <RadioGroup onChange={setLoanType} value={loanType}>
                <Stack direction="row" gap={4}>
                  <Radio value="UNICO">Dia</Radio>
                  <Radio value="SEMESTRAL">Semestral</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            {loanType === 'UNICO' && (
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
            )}

            {loanType === 'SEMESTRAL' && (
              <>
                <Flex w={'full'} justifyContent={'end'}>
                  <Button size={'sm'} onClick={createDiclosure.onOpen}>
                    Nuevo dia
                  </Button>
                </Flex>

                <TableContainer w={'full'}>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Dia</Th>
                        <Th>Hora</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody fontSize={'sm'}>
                      {days.map((day) => (
                        <Tr key={day.dia}>
                          <Td>{day.dia.toUpperCase()}</Td>
                          <Td>
                            {convertHour12h(day.hora_inicio)} -{' '}
                            {convertHour12h(day.hora_fin)}
                          </Td>
                          <Td>
                            <Flex>
                              <Button
                                size="sm"
                                iconSpacing={0}
                                variant="ghost"
                                // onClick={() => handleUpdate({ id, name })}
                                leftIcon={<MdOutlineModeEdit />}
                              />
                              <Button
                                size="sm"
                                iconSpacing={0}
                                variant="ghost"
                                onClick={() => handleRemoveDay(day.dia)}
                                leftIcon={<IoTrash />}
                              />
                            </Flex>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </>
            )}

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

                  {!mutationAvailableRooms.data?.success && (
                    <Center h={'calc(100% - 100px)'} flexDir={'column'}>
                      <IoWarning size={'50px'} />
                      <Text mt={6}>{mutationAvailableRooms.data?.message}</Text>
                    </Center>
                  )}
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
