import { Box, useDisclosure } from '@chakra-ui/react'

import Header from './Header.jsx'
import ListOfResources from './ListOfResources.jsx'
import ModalNewResource from './ModalNewResource.jsx'
import { useState } from 'react'

function ResourcesByRoom () {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [currentRoom, setCurrentRoom] = useState(null)

  return (
    <>
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
    </>
  )
}

export default ResourcesByRoom
