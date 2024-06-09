import { Box } from '@chakra-ui/react'

import MyLoans from '../components/MyLoans'
import UserOptions from '../components/UserOptions'
import Wrapper from '../components/Wrapper'
import useUser from '../hooks/useUser'
import LoadingUser from './LoadingUser'
import NotAuth from './NotAuth'

function User () {
  const { user, loading } = useUser()

  if (loading) {
    return <LoadingUser />
  }

  if (!loading && !user) {
    return <NotAuth />
  }

  return (
    <Wrapper>
      <Box>
        <UserOptions />
        <MyLoans />
      </Box>
    </Wrapper>
  )
}

export default User
