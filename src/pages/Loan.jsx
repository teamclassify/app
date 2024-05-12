import Loans from '../components/LoanForm'
import Wrapper from '../components/Wrapper'
import useUser from '../hooks/useUser'
import NotAuth from './NotAuth'

function Loan () {
  const { user, loading } = useUser()

  if (!loading && !user) {
    return <NotAuth />
  }

  return (
    <Wrapper>
      <Loans />
    </Wrapper>
  )
}

export default Loan
