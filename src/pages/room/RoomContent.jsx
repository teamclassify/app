import { Box, Spinner } from '@chakra-ui/react'
import { useQuery } from 'react-query'

import Schedule from '@/components/Schedule'
import RoomsService from '@/services/api/RoomsService'
import RoomNotFound from './RoomNotFound'

function RoomContent ({ id }) {
  const { data, isLoading } = useQuery(['room', id], () =>
    RoomsService.getById(id)
  )

  if (isLoading) {
    return <Spinner />
  }

  if (!isLoading && !data) {
    return <RoomNotFound />
  }

  return (
    <>
      {data && (
        <Box className='animate__fadeIn'>
          <Schedule roomId={data.id} />
        </Box>
      )}
    </>
  )
}

export default RoomContent
