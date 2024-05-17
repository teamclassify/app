import { Box, Button } from '@chakra-ui/react'
import { FcGoogle } from 'react-icons/fc'

import useUser from '../hooks/useUser'

function ButtonGoogle () {
  const { loginWithGoogle } = useUser()

  return (
    <>
    <Box>
        <Button onClick={loginWithGoogle} leftIcon={<FcGoogle />} border='1px solid #D9D9D9' borderRadius="10px" >
          Continuar con Google
        </Button>
      </Box>
    </>
  )
}
export default ButtonGoogle
