import { Box, useDisclosure } from '@chakra-ui/react'

import Wrapper from '@/components/Wrapper'
import useUser from '@/hooks/useUser'
import NotAuth from '../NotAuth'
import Header from './Header'
import ListOfResources from './ListOfResources'
import ModalNewResource from './ModalNewResource'

function RoomResources () {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, loading } = useUser()

  if (!loading && !user) {
    return <NotAuth />
  }

  if (!loading && user && !user.roles.includes('admin')) {
    return <NotAuth />
  }

  return (
    <Wrapper>
      <Box bg="white" rounded="md" borderWidth={1}>
        <ModalNewResource isOpen={isOpen} onClose={onClose} />
        <Header handleOpenModal={onOpen} />
        <ListOfResources />
      </Box>
    </Wrapper>
  )
}

export default RoomResources
