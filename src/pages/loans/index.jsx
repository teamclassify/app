import { Box, Heading } from '@chakra-ui/react'
import { useLocation } from 'wouter'

import Wrapper from '@/components/Wrapper'
import useUser from '@/hooks/useUser'
import NotAuth from '../NotAuth'
import ListOfLoans from './ListOfLoans'

function Loans () {
  const [, setLocation] = useLocation()
  const { user, loading } = useUser()

  if (!loading && !user) setLocation('/')

  if (!loading && user && !user.roles.includes('admin')) {
    return <NotAuth />
  }

  return (
    <Wrapper>
      <Box>
        <Heading as='h2' size='md' mb={4}>Préstamos pendientes</Heading>
        <ListOfLoans />
      </Box>
    </Wrapper>
  )
}

export default Loans
