import { Route, Switch } from 'wouter'

import HomePage from './pages/Home'
import LoanPage from './pages/Loan'
import LoginPage from './pages/Login'
import LoginUserPage from './pages/Login-Super-User'
import ErrorPage from './pages/NotFound'
import UploadSchedule from './pages/UploadSchedule'
import UploadRooms from './pages/UploadRooms'
import UserPage from './pages/User'
import BuildingsPage from './pages/buildings'
import RoomPage from './pages/room'
import RoomsPage from './pages/rooms'

function App () {
  return (
    <>
      <Switch>
        <Route component={HomePage} path="/" />
        <Route component={LoginPage} path="/login" />
        <Route component={LoginUserPage} path="/login-super-user" />
        <Route component={UserPage} path="/home" />
        <Route component={UploadSchedule} path="/subir-horarios" />
        <Route component={UploadRooms} path="/subir-salas" />
        <Route component={BuildingsPage} path="/edificios" />
        <Route component={RoomPage} path="/horario" />
        <Route component={RoomPage} path="/horario/:id" />
        <Route component={RoomsPage} path="/salas" />
        <Route component={LoanPage} path='/nuevo-prestamo'/>
        <Route component={ErrorPage} path="/:rest*" />
      </Switch>
    </>
  )
}

export default App
