import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import { IoMdAdd } from 'react-icons/io'

function Header ({ handleOpenModal }) {
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
            Recursos de las salas
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
    </Box>
  )
}

export default Header
