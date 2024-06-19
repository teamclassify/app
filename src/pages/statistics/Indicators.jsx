import { Box, Grid, Heading, Icon, Skeleton, Text } from '@chakra-ui/react'
import { FaUserAlt, FaBuilding } from 'react-icons/fa'
import useUsers from './useUsers.jsx'
import useLoans from './useLoans.js'

function Indicators () {
  const { users, isLoading } = useUsers()
  const { loans, isLoading: isLoadingLoans } = useLoans()

  return (
    <>
      <Heading mb={2} as={'h3'} size={'sm'}>
        Indicadores
      </Heading>

      <Grid gap={4} templateColumns={'repeat(auto-fill, minmax(15rem, 1fr))'}>
        {isLoading
          ? (
          <Skeleton height={'200px'} />
            )
          : (
          <Box bg={'blue.400'} p={4} rounded={'md'} color={'white'}>
            <Icon as={FaUserAlt} fontSize={'xx-large'} mb={2} />
            <Text fontSize={'lg'} fontWeight={'bold'}>
              Usuarios
            </Text>
            <Text fontSize={'xx-large'} fontWeight={'bold'}>
              {users[0] + users[1]}
            </Text>
          </Box>
            )}

        {isLoadingLoans
          ? (
          <Skeleton height={'200px'} />
            )
          : (
          <Box bg={'orange.400'} p={4} rounded={'md'} color={'white'}>
            <Icon as={FaBuilding} fontSize={'xx-large'} mb={2} />
            <Text fontSize={'lg'} fontWeight={'bold'}>
              Prestamos solicitados
            </Text>
            <Text fontSize={'xx-large'} fontWeight={'bold'}>
              {loans?.reduce((acc, cur) => acc + cur.cantidad_prestamos, 0)}
            </Text>
          </Box>
            )}
      </Grid>
    </>
  )
}

export default Indicators
