import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  Spinner,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useQuery } from 'react-query'

import EventsService from '@/services/api/EventsService'
import { convertDateRoom } from '@/utils/convertDateRoom'
import Modal from './Modal'

const localizer = momentLocalizer(moment)

function Schedule (
  { roomId, isClickable, handleSelectSlot } = {
    isClickable: false
  }
) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentEvent, setCurrentEvent] = useState(null)
  const [events, setEvents] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { data, isLoading, isError } = useQuery(['schedule', roomId], () =>
    EventsService.getAllByRoom(roomId)
  )

  const handleSelectEvent = (event) => {
    setCurrentEvent(event)
    onOpen()
  }

  useEffect(() => {
    if (data) {
      setEvents(() => {
        return data.map((event) => {
          return {
            id: event.id,
            title: event.nombre,
            ...convertDateRoom(
              currentDate,
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
            cod_docente: event.cod_docente,
            tipo: event.tipo
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
                {currentEvent.usuario_id && (
                  <Box>
                    <strong>Prestado a:</strong> {currentEvent.usuario_id}
                  </Box>
                )}
              </>
                )}

            {currentEvent.cod_asignatura && currentEvent.grupo && (
              <Box>
                <strong>Asignatura:</strong>
                {currentEvent.cod_asignatura} - {currentEvent.grupo}
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
          </Box>
        </Modal>
      )}

      {data && (
        <Calendar
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
