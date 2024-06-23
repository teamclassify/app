import { Box, useDisclosure } from '@chakra-ui/react'

import Wrapper from '@/components/Wrapper'
import useUser from '@/hooks/useUser'
import NotAuth from '../NotAuth'
import Header from './Header'
import ListOfResources from './ListOfResources'
import ModalNewResource from './ModalNewResource'
import { useParams } from 'wouter'
import { useEffect, useState } from 'react'

function RoomResources () {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, loading } = useUser()
  const params = useParams()
  const id = params?.id

  const [currentRoom, setCurrentRoom] = useState(null)

  useEffect(() => {
    setCurrentRoom(id)
  }, [id])

  if (!loading && !user) {
    return <NotAuth />
  }

  if (
    !loading &&
    user &&
    !user.roles.includes('admin') &&
    !user.roles.includes('soporte_tecnico')
  ) {
    return <NotAuth />
  }

  return (
    <Wrapper>
      <Box bg="white" rounded="md" borderWidth={1}>
        <ModalNewResource
          isOpen={isOpen}
          onClose={onClose}
          roomId={currentRoom}
        />
        <Header
          handleOpenModal={onOpen}
          currentRoom={currentRoom}
          setCurrentRoom={setCurrentRoom}
        />
        {currentRoom && (
          <ListOfResources roomId={currentRoom} onOpenModalNew={onOpen} />
        )}
      </Box>
    </Wrapper>
  )
}

export default RoomResources
