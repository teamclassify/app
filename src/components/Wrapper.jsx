import { Grid, Box, Spinner, Center } from '@chakra-ui/react'

import DrawerMenu from './Drawer'
import Header from './Header'
import useUser from '../hooks/useUser'

function Wrapper ({ children }) {
  const { loading } = useUser()

  return (
    <Grid h='100vh' gridTemplateColumns={{ base: '1fr', md: '0.2fr 1fr' }}>
      <DrawerMenu />

      <Box px={4} overflowY='auto'>
        <Header />

        {loading
          ? (
          <Center minH="90vh">
            <Spinner size="xl" />
          </Center>

            )
          : (
          <Box mt={0}>{children}</Box>
            )}
      </Box>
    </Grid>
  )
}

export default Wrapper
