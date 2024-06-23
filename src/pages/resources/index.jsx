import { Box, useDisclosure } from '@chakra-ui/react'

import Wrapper from '@/components/Wrapper'
import useUser from '@/hooks/useUser'
import NotAuth from '../NotAuth'
import Header from './Header.jsx'
import ListOfResources from './ListOfResources.jsx'
import ModalNewResource from './ModalNewResource.jsx'
import ResourcesByRoom from '../room-resources/ResourcesByRoom.jsx'

function Resources () {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, loading } = useUser()

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
      <Box mb={6} bg="white" rounded="md" borderWidth={1}>
        <ModalNewResource isOpen={isOpen} onClose={onClose} />
        <Header handleOpenModal={onOpen} />
        <ListOfResources />
      </Box>

      <ResourcesByRoom />
    </Wrapper>
  )
}

export default Resources
