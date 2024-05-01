import { Grid, Box, Spinner, Center } from '@chakra-ui/react'

import DrawerMenu from './Drawer'
import Header from './Header'
import useUser from '../hooks/useUser'

function Wrapper ({ children }) {
  const { loading } = useUser()

  return (
    <Grid gridTemplateColumns={{ base: '1fr', md: '0.14fr 1fr' }}>
      <DrawerMenu />

      <Box px={4}>
        <Header />

        {loading
          ? (
          <Center minH="90vh">
            <Spinner size="xl" />
          </Center>
            )
          : (
          <Box mt={4}>{children}</Box>
            )}
      </Box>
    </Grid>
  )
}

export default Wrapper
