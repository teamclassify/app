import { Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { FaRegBuilding } from 'react-icons/fa'
import { MdOutlineDoorBack } from 'react-icons/md'
import { useLocation, useParams } from 'wouter'

import Wrapper from '@/components/Wrapper'
import SelectBuildings from '../rooms/SelectBuildings'
import SelectRooms from '../rooms/SelectRooms'
import RoomContent from './RoomContent'
import RoomNotFound from './RoomNotFound'

function Room () {
  const [currentBuilding, setCurrentBuilding] = useState(null)
  const [, setLocation] = useLocation()
  const params = useParams()
  const id = params.id

  const handleChangeRoom = (roomId) => {
    setLocation(`/horario/${roomId}`)
  }

  return (
    <>
      <Wrapper>
        <Flex mb={2} gap={2} alignItems="center">
          <Flex alignItems="center" gap={2} bg='white' px={2} py={1} rounded='md'>
            <FaRegBuilding size="20px" />
            <SelectBuildings
              size='sm'
              currentBuilding={currentBuilding}
              setCurrentBuilding={setCurrentBuilding}
            />
          </Flex>

          <Flex alignItems="center" gap={2} bg='white' px={2} py={1} rounded='md'>
            <MdOutlineDoorBack size="26px" />
            <SelectRooms
              size='sm'
              currentRoom={id}
              building={currentBuilding}
              handleChange={handleChangeRoom}
            />
          </Flex>
        </Flex>

        {id ? <RoomContent id={id} /> : <RoomNotFound />}
      </Wrapper>
    </>
  )
}

export default Room
