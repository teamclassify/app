import { Route, Switch } from 'wouter'

import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import UserPage from './pages/User'
import ErrorPage from './pages/NotFound'
import BuildingsPage from './pages/buildings'
import RoomPage from './pages/room'

function App () {
  return (
    <>
      <Switch>
        <Route component={HomePage} path="/" />
        <Route component={LoginPage} path="/login" />
        <Route component={UserPage} path="/home" />
        <Route component={BuildingsPage} path="/edificios" />
        <Route component={RoomPage} path="/horario/:id" />
        <Route component={ErrorPage} path="/:rest*" />
      </Switch>
    </>
  )
}

export default App
