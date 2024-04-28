import { Button, Heading } from '@chakra-ui/react'
import useUser from '../hooks/useUser'

function Login () {
  const { loginWithGoogle, user } = useUser()

  console.log(user)

  return (
    <>
      <Heading>Login</Heading>

      <Button onClick={loginWithGoogle}>Google</Button>
    </>
  )
}

export default Login
