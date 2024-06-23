import { Box, Flex, Heading } from '@chakra-ui/react'
import { FaRegBuilding } from 'react-icons/fa'
import SelectBuildings from '../rooms/SelectBuildings.jsx'
import { MdOutlineDoorBack } from 'react-icons/md'
import SelectRooms from '../rooms/SelectRooms.jsx'
import { useState } from 'react'

function Header ({ handleOpenModal, currentRoom, setCurrentRoom }) {
  const [currentBuilding, setCurrentBuilding] = useState(null)

  const handleChangeRoom = (roomId) => {
    // setLocation(`/salas/recursos/${roomId}`)
    setCurrentRoom(roomId)
  }

  const onChangeBuilding = (building) => {
    setCurrentBuilding(building)
    setCurrentRoom(null)
  }

  return (
    <Box>
      <Flex
        p={4}
        borderBottomWidth={1}
        alignContent="center"
        justifyContent="space-between"
      >
        <Flex alignItems="center" gap={2}>
          <Heading as="h2" size="md">
            Recursos de la salas
          </Heading>
        </Flex>
      </Flex>

      <Flex p={4} borderBottomWidth={1} gap={2} alignItems="center">
        <Flex alignItems="center" gap={2} bg="white" px={2} py={1} rounded="md">
          <FaRegBuilding size="20px" />
          <SelectBuildings
            size="sm"
            currentBuilding={currentBuilding}
            setCurrentBuilding={onChangeBuilding}
          />
        </Flex>

        <Flex alignItems="center" gap={2} bg="white" px={2} py={1} rounded="md">
          <MdOutlineDoorBack size="26px" />
          <SelectRooms
            size="sm"
            currentRoom={currentRoom}
            building={currentBuilding}
            handleChange={handleChangeRoom}
          />
        </Flex>
      </Flex>
    </Box>
  )
}

export default Header
