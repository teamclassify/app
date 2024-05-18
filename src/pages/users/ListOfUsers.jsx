import {
  Alert,
  AlertTitle,
  Avatar,
  Badge,
  Box,
  Center,
  Flex,
  Grid,
  Spinner,
  Text
} from '@chakra-ui/react'
import { useQuery } from 'react-query'

import UsersService from '@/services/api/UsersService'

function ListOfUsers () {
  const { isLoading, data } = useQuery('users', UsersService.getAll)

  if (!isLoading && data.error) {
    return (
      <Alert status="error">
        <AlertTitle>Error al obtener los edificios</AlertTitle>
      </Alert>
    )
  }

  if (!isLoading && !data) {
    return (
      <Alert status="info">
        <AlertTitle>No existen edificios</AlertTitle>
      </Alert>
    )
  }

  return (
    <Grid>
      {isLoading
        ? (
        <Center my={4}>
          <Spinner size="md" />
        </Center>
          )
        : (
        <Box bg="white" rounded="md">
          {data &&
            data.data &&
            data.data.map((user) => (
              <Flex key={user.id} p={4} gap={4} alignItems="center">
                <Avatar src={user.photo} alt={user.nombre} />

                <Box>
                  <Text fontWeight="bold">{user.nombre}</Text>
                  <Text mb={2}>{user.correo}</Text>

                  <Flex>
                    {user.roles.map((role) => (
                      <Badge key={role} colorScheme="green" mr={2}>
                        {role}
                      </Badge>
                    ))}
                  </Flex>
                </Box>
              </Flex>
            ))}
        </Box>
          )}
    </Grid>
  )
}

export default ListOfUsers
