import { Route, Switch } from 'wouter'

import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import ErrorPage from './pages/NotFound'

import Header from './components/Header'

function App () {
  return (
    <>
      <Header />

      <Switch>
        <Route component={HomePage} path="/" />
        <Route component={LoginPage} path="/login" />

        <Route component={ErrorPage} path="/:rest*" />
      </Switch>
    </>
  )
}

export default App
