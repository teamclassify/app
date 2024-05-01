import { Box, useDisclosure } from '@chakra-ui/react'

import Wrapper from '@/components/Wrapper'
import Header from './Header'
import ListOfBuildings from './ListOfBuildings'
import ModalNewBuilding from './ModalNewBuilding'

function Buildings () {
  const { isOpen, onOpen, onClose } = useDisclosure()

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
