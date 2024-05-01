import { Grid, Box } from '@chakra-ui/react'

import DrawerMenu from './Drawer'
import Header from './Header'

function Wrapper ({ children }) {
  return <Grid gridTemplateColumns={{ base: '1fr', md: '0.14fr 1fr' }}>
    <DrawerMenu />

    <Box px={4}>
      <Header />

      <Box mt={4}>
        {children}
      </Box>
    </Box>
</Grid>
}

export default Wrapper
