import { Grid, Box } from '@chakra-ui/react'

import DrawerMenu from './Drawer'
import Header from './Header'

function Wrapper ({ children }) {
  return <Grid gridTemplateColumns="0.14fr 1fr">
    <DrawerMenu />

    <Box px={4}>
      <Header />

      {children}
    </Box>
</Grid>
}

export default Wrapper
