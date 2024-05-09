import { Box, Grid } from '@chakra-ui/react'

import useUser from '../hooks/useUser'
import LoadingUser from '../pages/LoadingUser'
import DrawerMenu from './Drawer'
import Header from './Header'

function Wrapper ({ children }) {
  const { loading } = useUser()

  if (loading) {
    return <LoadingUser />
  }

  return (
    <Grid h="100vh" gridTemplateColumns={{ base: '1fr', md: '0.2fr 1fr' }}>
      <DrawerMenu />

      <Box px={4} overflowY="auto">
        <Header />

        <Box mt={0}>{children}</Box>
      </Box>
    </Grid>
  )
}

export default Wrapper
