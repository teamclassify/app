import { Route, Switch } from 'wouter'

import HomePage from './pages/Home'
import LoanPage from './pages/Loan'
import LoginPage from './pages/Login'
import LoginUserPage from './pages/Login-Super-User'
import ErrorPage from './pages/NotFound'
import UpdatePage from './pages/UploadPDF'
import UserPage from './pages/User'
import BuildingsPage from './pages/buildings'
import RoomPage from './pages/room'
import RoomsPage from './pages/rooms'
import LoanConfirmPage from './pages/Prestamo-Confirmado'

function App () {
  return (
    <>
      <Switch>
        <Route component={HomePage} path="/" />
        <Route component={LoginPage} path="/login" />
        <Route component={LoginUserPage} path="/login-super-user" />
        <Route component={UserPage} path="/home" />
        <Route component={UpdatePage} path="/upload" />
        <Route component={BuildingsPage} path="/edificios" />
        <Route component={RoomPage} path="/horario" />
        <Route component={RoomPage} path="/horario/:id" />
        <Route component={RoomsPage} path="/salas" />
        <Route component={LoanPage} path='/prestamos'/>
        <Route component={LoanConfirmPage} path="/prestamo-confirmado" />
        <Route component={ErrorPage} path="/:rest*" />
      </Switch>
    </>
  )
}

export default App
