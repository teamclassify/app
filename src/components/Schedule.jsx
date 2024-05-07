import { Box, Spinner } from '@chakra-ui/react'
import moment from 'moment'
import { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useQuery } from 'react-query'

import EventsService from '@/services/api/EventsService'
import { convertDateRoom } from '@/utils/convertDateRoom'

const localizer = momentLocalizer(moment)

function Schedule ({ roomId }) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const { data, isLoading } = useQuery(['schedule', roomId], () =>
    EventsService.getAllByRoom(roomId)
  )

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Box bg="white" p={2} rounded="md">
      {data && (
        <Calendar
          onRangeChange={range => setCurrentDate(range[0])}
          defaultDate={currentDate}
          localizer={localizer}
          events={data.map((event) => {
            return {
              title: event.nombre,
              ...convertDateRoom(currentDate, event.dia, event.hora_inicio, event.hora_fin)
            }
          })}
          startAccessor="start"
          endAccessor="end"
          defaultView="week"
          views={['week', 'day']}
          style={{ height: 500 }}
        />
      )}
    </Box>
  )
}

export default Schedule
