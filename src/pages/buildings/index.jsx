import { Box, useDisclosure } from '@chakra-ui/react'

import Wrapper from '@/components/Wrapper'
import useUser from '../../hooks/useUser'
import NotAuth from '../NotAuth'
import Header from './Header'
import ListOfBuildings from './ListOfBuildings'
import ModalNewBuilding from './ModalNewBuilding'

function Buildings () {
  // const [, setLocation] = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, loading } = useUser()

  if (!loading && !user) return <NotAuth />

  if (!loading && user && !user.roles.includes('admin') && !user.roles.includes('soporte_tecnico')) {
    return <NotAuth />
  }

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
