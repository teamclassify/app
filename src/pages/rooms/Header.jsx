import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import { IoMdAdd } from 'react-icons/io'

import SelectBuildings from './SelectBuildings'

function Header ({ handleOpenModal, currentBuilding, setCurrentBuilding }) {
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
            Salas
          </Heading>
        </Flex>

        <Button
          colorScheme="primary"
          size="sm"
          leftIcon={<IoMdAdd />}
          onClick={handleOpenModal}
        >
          Nuevo
        </Button>
      </Flex>

      <Flex p={4} borderBottomWidth={1}>
        <SelectBuildings
          currentBuilding={currentBuilding}
          setCurrentBuilding={setCurrentBuilding}
        />
      </Flex>
    </Box>
  )
}

export default Header
