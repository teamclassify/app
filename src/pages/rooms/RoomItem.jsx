import { Button, Flex, Heading } from '@chakra-ui/react'
import { FaRegBuilding } from 'react-icons/fa'
import { IoTrash } from 'react-icons/io5'
import { MdOutlineModeEdit } from 'react-icons/md'

function RoomItem ({ id, name, handleDelete, handleUpdate }) {
  return (
    <Flex
      _hover={{
        bg: 'gray.50'
      }}
      p={4}
      cursor="pointer"
      alignItems="center"
      borderBottomWidth={1}
      className="animate__fadeIn"
      justifyContent="space-between"
    >
      <Flex alignItems="center" gap={4}>
        <FaRegBuilding fontSize="1.5rem" />
        <Heading as="h3" size="sm">
          {name}
        </Heading>
      </Flex>

      <Flex>
        <Button
          size="md"
          iconSpacing={0}
          variant="ghost"
          onClick={() => handleUpdate({ id, name })}
          leftIcon={<MdOutlineModeEdit />}
        />
        <Button
          size="md"
          iconSpacing={0}
          variant="ghost"
          onClick={() => handleDelete(id)}
          leftIcon={<IoTrash />}
        />
      </Flex>
    </Flex>
  )
}

export default RoomItem
