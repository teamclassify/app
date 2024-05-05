import { Flex, Heading, Spinner } from '@chakra-ui/react'
import { FaBuilding } from 'react-icons/fa6'
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
        <>
          <Flex
            p={2}
            mb={4}
            gap={2}
            bg="white"
            rounded="md"
            alignItems="center"
          >
            <FaBuilding />

            <Heading as="h2" size="md">
              {data.nombre}
            </Heading>
          </Flex>

          <Schedule roomId={data.id} />
        </>
      )}
    </>
  )
}

export default RoomContent
