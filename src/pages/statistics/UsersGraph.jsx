import {
  Heading,
  Box,
  Flex,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Skeleton
} from '@chakra-ui/react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import Colors from './Colors.js'
import useUsers from './useUsers.jsx'

ChartJS.register(ArcElement, Tooltip, Legend)

function UsersGraph () {
  const { users, isLoading } = useUsers()

  return (
    <>
      <Heading mb={2} as={'h3'} size={'sm'}>
        Usuarios
      </Heading>

      <Box w={'90%'} maxW={'lg'} bg={'white'} rounded={'md'}>
        {isLoading
          ? (
          <Skeleton height={'250px'} />
            )
          : (
          <Flex p={4}>
            <Box w={'50%'}>
              <Pie
                data={{
                  labels: ['Inactivos', 'Activos'],
                  datasets: [
                    {
                      label: '# de usuarios',
                      data: users,
                      backgroundColor: [Colors.CANCELADO, Colors.APROBADO]
                    }
                  ]
                }}
              />
            </Box>

            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Estado</Th>
                    <Th>Cantidad</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  <Tr>
                    <Td>Activos</Td>
                    <Td>{users[1]}</Td>
                  </Tr>

                  <Tr>
                    <Td>Inactivos</Td>
                    <Td>{users[0]}</Td>
                  </Tr>

                  <Tr>
                    <Td></Td>
                    <Td fontWeight={'bold'}>{users[0] + users[1]}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
            )}
      </Box>
    </>
  )
}

export default UsersGraph
