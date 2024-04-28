import { Route, Switch } from 'wouter'
import { Box } from '@chakra-ui/react'

import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import ErrorPage from './pages/NotFound'

import Header from './components/Header'

function App () {
  return (
    <>
      <Header />

      <Box
        mx='auto'
        mt='2rem'
        w='90%'
        maxW='container.xl'
      >
        <Switch>
          <Route component={HomePage} path="/" />
          <Route component={LoginPage} path="/login" />

          <Route component={ErrorPage} path="/:rest*" />
        </Switch>
      </Box>
    </>
  )
}

export default App
