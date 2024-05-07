import { Route, Switch } from 'wouter'

import HomePage from './pages/Home'
import LoanPage from './pages/Loan'
import LoginPage from './pages/Login'
import ErrorPage from './pages/NotFound'
import UserPage from './pages/User'
import UpdatePage from './pages/UploadPDF'
import BuildingsPage from './pages/buildings'

function App () {
  return (
    <>
      <Switch>
        <Route component={HomePage} path="/" />
        <Route component={LoginPage} path="/login" />
        <Route component={UserPage} path="/home" />
        <Route component={UpdatePage} path="/upload" />
        <Route component={BuildingsPage} path="/edificios" />
        <Route component={LoanPage} path='/prestamos'/>
        <Route component={ErrorPage} path="/:rest*" />
      </Switch>
    </>
  )
}

export default App
