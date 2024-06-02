import { Box, Grid } from '@chakra-ui/react'

import useUser from '../hooks/useUser'
import LoadingUser from '../pages/LoadingUser'
import DrawerMenu from './Drawer'

function Wrapper ({ children }) {
  const { loading } = useUser()

  if (loading) {
    return <LoadingUser />
  }

  return (
    <Grid gridTemplateColumns={{ base: '1fr', md: '250px 1fr' }}>
      <DrawerMenu />
      <Box h={0}></Box>

      <Box>
        <Box py={4} px={4}>
          <Box mt={0}>{children}</Box>
        </Box>
      </Box>
    </Grid>
  )
}

export default Wrapper
