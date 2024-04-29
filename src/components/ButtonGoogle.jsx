import { Box, Button } from '@chakra-ui/react'
import { FcGoogle } from 'react-icons/fc'
import useUser from '../hooks/useUser'

function ButtonGoogle () {
  const { loginWithGoogle } = useUser()
  return (
    <>
    <Box>
        <Button onClick={loginWithGoogle} colorSheme='google' leftIcon={<FcGoogle />} >
          Continuar con Google
        </Button>
      </Box>
    </>
  )
}
export default ButtonGoogle
