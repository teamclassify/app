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
import LoanSuccessPage from './pages/LoanSuccess'
import LoansPage from './pages/loans'
import RegisterPage from './pages/Register'
import UsersPage from './pages/users'
import RoomResourcesPage from './pages/room-resources'
import ResourcesPage from './pages/resources'
import StatisticsPage from './pages/statistics'
import useUser from './hooks/useUser.js'
import AnomaliesPage from './pages/anomalies/index.jsx'
import ReportAnomaliePage from './pages/report-anomalie/index.jsx'
import VerifyEmailPage from './pages/verify-email'
import UserRegisteredPage from './pages/verify-email/UserRegistered'
import UploadRoomResources from './pages/UploadRoomResources.jsx'

function App () {
  const { isOnlyVigilant } = useUser()
  const isVigilant = isOnlyVigilant()

  return (
    <>
      <Switch>
        <Route component={HomePage} path="/" />
        <Route component={LoginPage} path="/login" />
        <Route component={VerifyEmailPage} path="/verificar-email" />
        <Route component={UserRegisteredPage} path="/usuario-registrado" />
        <Route component={LoginUserPage} path="/login-super-user" />
        <Route component={RegisterPage} path="/registrarse" />
        <Route component={isVigilant ? RoomPage : UserPage} path="/home" />
        <Route component={UploadSchedule} path="/subir-horarios" />
        <Route component={UploadRooms} path="/subir-salas" />
        <Route component={UploadRoomResources} path="/subir-recursos" />
        <Route component={BuildingsPage} path="/edificios" />
        <Route component={RoomPage} path="/horario" />
        <Route component={RoomPage} path="/horario/:id" />
        <Route component={RoomsPage} path="/salas" />
        <Route component={ResourcesPage} path="/salas/recursos" />
        <Route component={RoomResourcesPage} path="/salas/recursos/:id" />
        <Route component={LoanPage} path="/nuevo-prestamo" />
        <Route component={LoanSuccessPage} path="/prestamo-solicitado/:id" />
        <Route component={LoansPage} path="/prestamos" />
        <Route component={UsersPage} path="/usuarios" />
        <Route component={StatisticsPage} path="/estadisticas" />
        <Route component={AnomaliesPage} path="/anomalias" />
        <Route component={ReportAnomaliePage} path="/anomalias/nueva/:id" />
        <Route component={ErrorPage} path="/:rest*" />
      </Switch>
    </>
  )
}

export default App
