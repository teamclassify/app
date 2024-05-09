import { Box, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { useLocation } from 'wouter'

import Wrapper from '@/components/Wrapper'
import useUser from '@/hooks/useUser'
import NotAuth from '../NotAuth'
import Header from './Header'
import ListOfRooms from './ListOfRooms'
import ModalNewRoom from './ModalNewRoom'

function Rooms () {
  const [, setLocation] = useLocation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, loading } = useUser()
  const [currentBuilding, setCurrentBuilding] = useState(null)

  if (!loading && !user) setLocation('/')

  if (!loading && user && !user.roles.includes('admin')) {
    return <NotAuth />
  }

  return (
    <Wrapper>
      <Box bg="white" rounded="md" borderWidth={1}>
        <ModalNewRoom isOpen={isOpen} onClose={onClose} />

        <Header
          handleOpenModal={onOpen}
          currentBuilding={currentBuilding}
          setCurrentBuilding={setCurrentBuilding}
        />

        <ListOfRooms currentBuilding={currentBuilding} />
      </Box>
    </Wrapper>
  )
}

export default Rooms
