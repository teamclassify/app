import { Box, useDisclosure } from '@chakra-ui/react'
import { useLocation } from 'wouter'

import Wrapper from '@/components/Wrapper'
import Header from './Header'
import ListOfBuildings from './ListOfBuildings'
import ModalNewBuilding from './ModalNewBuilding'
import useUser from '../../hooks/useUser'

function Buildings () {
  const [, setLocation] = useLocation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, loading } = useUser()

  if (!loading && !user) setLocation('/')

  return (
    <Wrapper>
      <Box bg="white" rounded="md" borderWidth={1}>
        <ModalNewBuilding isOpen={isOpen} onClose={onClose} />
        <Header handleOpenModal={onOpen} />
        <ListOfBuildings />
      </Box>
    </Wrapper>
  )
}

export default Buildings
