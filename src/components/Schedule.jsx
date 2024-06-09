import {
  Alert,
  AlertIcon,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Spinner,
  Text,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useMutation, useQuery } from 'react-query'
import 'moment/locale/es'
import { FaCheck } from 'react-icons/fa'
import { Link } from 'wouter'

import EventsService from '@/services/api/EventsService'
import { convertDateRoom } from '@/utils/convertDateRoom'
import Modal from './Modal'
import useUser from '../hooks/useUser.js'

const localizer = momentLocalizer(moment)
moment.locale('es')

function Schedule (
  { roomId, isClickable, handleSelectSlot } = {
    isClickable: false
  }
) {
  const { user } = useUser()
  const toast = useToast()

  const [currentDate, setCurrentDate] = useState(new Date())
  const [minHours, setMinHours] = useState(new Date())
  const [maxHours, setMaxHours] = useState(new Date())
  const [currentEvent, setCurrentEvent] = useState(null)
  const [events, setEvents] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { data, isLoading, isError } = useQuery(['schedule', roomId], () =>
    EventsService.getAllByRoom(roomId)
  )

  const { mutate } = useMutation(
    (data) => {
      return EventsService.update(data.id, data.asistencia)
    },
    {
      onSuccess: (data) => {
        if (data?.success) {
          toast({
            title: 'Correcto',
            description: 'Asistencia registrada correctamente',
            status: 'success',
            duration: 5000,
            isClosable: true
          })

          onClose()
        } else {
          toast({
            title: 'Error',
            description: data.message,
            status: 'error',
            duration: 5000,
            isClosable: true
          })
        }
      }
    }
  )

  const handleSelectEvent = (event) => {
    setCurrentEvent(event)
    onOpen()
  }

  const handleCheckAssist = () => {
    if (!currentEvent) return

    mutate({
      id: currentEvent.id,
      asistencia: !currentEvent.asistencia
    })
  }

  useEffect(() => {
    setMinHours((prev) => {
      prev.setHours(6)
      prev.setMinutes(0)
      return prev
    })

    setMaxHours((prev) => {
      prev.setHours(22)
      prev.setMinutes(0)
      return prev
    })

    if (data) {
      setEvents(() => {
        return data.map((event) => {
          return {
            id: event.id,
            title: event.nombre,
            ...convertDateRoom(
              event.tipo === 'prestamo' ? new Date(event.fecha) : currentDate,
              event.dia,
              event.hora_inicio,
              event.hora_fin
            ),
            cantidad_personas: event.cantidad_personas,
            razon: event.razon,
            cod_asignatura: event.cod_asignatura,
            grupo: event.grupo,
            estado: event.estado,
            fecha: event.fecha,
            usuario_id: event.usuario_id,
            usuario_nombre: event.usuario_nombre,
            usuario_username: event.usuario_username,
            usuario_foto: event.usuario_foto,
            usuario_codigo: event.usuario_codigo,
            cod_docente: event.cod_docente,
            tipo: event.tipo,
            asistencia: event.asistencia
          }
        })
      })
    }
  }, [data, handleSelectSlot, isClickable, currentDate])

  if (isLoading) {
    return (
      <Center h="100%">
        <Spinner />
      </Center>
    )
  }

  if (!isLoading && isError) {
    return <span>Error al obtener el horario</span>
  }

  if (!isLoading && !Array.isArray(data)) {
    return (
      <Alert rounded="md">
        <AlertIcon />
        <AlertTitle>No se logro obtener el horario</AlertTitle>
      </Alert>
    )
  }

  return (
    <Box bg="white" p={2} rounded="md">
      {currentEvent && (
        <Modal isOpen={isOpen} onClose={onClose} title={currentEvent.title}>
          <Box>
            <Box>
              <strong>Fecha: </strong>
              <Text display="inline">
                {moment(currentEvent.start).format('DD/MM/YYYY')}
              </Text>
            </Box>

            <Box>
              <strong>Hora de inicio: </strong>
              <Text display="inline">
                {moment(currentEvent.start).format('HH:mm')}
              </Text>
            </Box>

            <Box>
              <strong>Hora de fin: </strong>
              <Text display="inline">
                {moment(currentEvent.end).format('HH:mm')}
              </Text>
            </Box>

            {currentEvent.cod_asignatura && (
              <Box>
                <strong>Asignatura: </strong>
                {currentEvent.cod_asignatura}
              </Box>
            )}

            {currentEvent.razon && (
              <Box>
                <strong>Razon:</strong> {currentEvent.razon}
              </Box>
            )}

            <Box>
              <strong>Cantidad de personas: </strong>
              <Text display="inline">{currentEvent.cantidad_personas}</Text>
            </Box>

            {currentEvent.tipo && currentEvent.tipo === 'clase'
              ? (
              <>
                {currentEvent.cod_docente && (
                  <Box>
                    <strong>Docente:</strong> {currentEvent.cod_docente}
                  </Box>
                )}
              </>
                )
              : (
              <>
                {currentEvent.usuario_id &&
                  (user?.roles.includes('vigilante') ||
                    user?.roles.includes('admin')) && (
                    <Box>
                      <strong>Prestado a:</strong>

                      <Flex mt={4} gap={4}>
                        <Avatar
                          src={currentEvent.usuario_foto}
                          mb={2}
                          size="lg"
                        />
                        <Box>
                          <Text fontSize="sm">
                            {currentEvent.usuario_nombre}
                          </Text>

                          {currentEvent.usuario_codigo && (
                            <Text fontSize="sm">
                              {currentEvent.usuario_codigo}
                            </Text>
                          )}

                          <Text
                            fontSize="sm"
                            title="Ver perfil"
                            _hover={{
                              textDecoration: 'underline',
                              color: 'primary.400'
                            }}
                          >
                            <Link
                              href={`/usuarios/${currentEvent.usuario_username}`}
                            >
                              @{currentEvent.usuario_username}
                            </Link>
                          </Text>
                        </Box>
                      </Flex>

                      <Button
                        my={4}
                        size="sm"
                        colorScheme="blue"
                        leftIcon={<FaCheck />}
                        onClick={handleCheckAssist}
                        isDisabled={currentEvent.asistencia}
                      >
                        SI asistió
                      </Button>
                    </Box>
                )}
              </>
                )}
          </Box>
        </Modal>
      )}

      {data && (
        <Calendar
          step={60}
          timeslots={1}
          culture="es"
          min={minHours}
          max={maxHours}
          onRangeChange={(range) => setCurrentDate(range[0])}
          defaultDate={currentDate}
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="week"
          selectable
          views={['week', 'day']}
          style={{ height: 500 }}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
        />
      )}
    </Box>
  )
}

export default Schedule
