import { Route, Switch } from 'wouter'

import HomePage from './pages/Home'
import LoanPage from './pages/Loan'
import LoginPage from './pages/Login'
import ErrorPage from './pages/NotFound'
import BuildingsPage from './pages/buildings'
import UserPage from './pages/User'

function App () {
  return (
    <>
      <Switch>
        <Route component={HomePage} path="/" />
        <Route component={LoginPage} path="/login" />
        <Route component={UserPage} path="/home" />
        <Route component={BuildingsPage} path="/edificios" />
        <Route component={LoanPage} path='/prestamos'/>
        <Route component={ErrorPage} path="/:rest*" />
      </Switch>
    </>
  )
}

export default App
