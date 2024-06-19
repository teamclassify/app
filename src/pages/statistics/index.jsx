import { Box, Divider, Grid, Heading } from '@chakra-ui/react'
import { useLocation } from 'wouter'

import Wrapper from '@/components/Wrapper'
import useUser from '@/hooks/useUser'
import NotAuth from '../NotAuth'
import LoansGraph from './LoansGraph.jsx'
import LoansGraphMonths from './LoansGraphMonths.jsx'
import Indicators from './Indicators.jsx'
import UsersGraph from './UsersGraph.jsx'
import UsersProvider from './UsersContext'
import LoansProvider from './LoansContext.jsx'

function Statistics () {
  const [, setLocation] = useLocation()
  const { user, loading } = useUser()

  if (!loading && !user) setLocation('/')

  if (
    !loading &&
    user &&
    !user.roles.includes('admin') &&
    !user.roles.includes('soporte_tecnico')
  ) {
    return <NotAuth />
  }

  return (
    <Wrapper>
      <UsersProvider>
        <LoansProvider>
          <Box>
            <Heading as="h2" size="md" mb={4}>
              Estadísticas
            </Heading>

            <Indicators />

            <Divider my={4} />

            <UsersGraph />

            <Divider my={4} />

            <Heading mb={2} as={'h3'} size={'sm'}>
              Prestamos
            </Heading>

            <Grid w={'full'} gap={4} templateColumns="repeat(2, 1fr)">
              <LoansGraph />
              <LoansGraphMonths />
            </Grid>
          </Box>
        </LoansProvider>
      </UsersProvider>
    </Wrapper>
  )
}

export default Statistics
