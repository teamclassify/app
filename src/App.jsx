import { Route, Switch } from 'wouter'
import { Box } from '@chakra-ui/react'

import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import UserPage from './pages/User'
import ErrorPage from './pages/NotFound'

function App () {
  return (
    <>
      <Switch>
        <Route component={HomePage} path="/" />
        <Route component={LoginPage} path="/login" />
        <Route component={UserPage} path="/home" />
        <Route component={ErrorPage} path="/:rest*" />
      </Switch>
    </>
  )
}

export default App
