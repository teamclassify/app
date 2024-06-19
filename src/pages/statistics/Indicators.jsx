import { Box, Grid, Heading, Icon, Skeleton, Text } from '@chakra-ui/react'
import { FaUserCircle } from 'react-icons/fa'
import useUsers from './useUsers.jsx'
import LoansIndicators from './LoansIndicators.jsx'

function Indicators () {
  const { users, isLoading } = useUsers()

  return (
    <>
      <Heading mb={2} as={'h3'} size={'sm'}>
        Historico
      </Heading>

      <Grid gap={4} templateColumns={'repeat(auto-fill, minmax(15rem, 1fr))'}>
        {isLoading
          ? (
          <Skeleton height={'160px'} />
            )
          : (
          <Box bg={'blue.400'} p={4} rounded={'md'} color={'white'}>
            <Icon as={FaUserCircle} fontSize={'xx-large'} mb={2} />
            <Text fontSize={'lg'} fontWeight={'bold'}>
              Usuarios
            </Text>
            <Text fontSize={'xx-large'} fontWeight={'bold'}>
              {users[0] + users[1]}
            </Text>
          </Box>
            )}

        <LoansIndicators />
      </Grid>
    </>
  )
}

export default Indicators
