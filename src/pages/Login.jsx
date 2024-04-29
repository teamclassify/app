import { Center, Text } from '@chakra-ui/react'
import LogoUFPS from '../components/Logos/LogoUFPS'
import LoginGoogle from '../components/ButtonGoogle'

function Login () {
  return (
    <>
    <Center>
        <Center mx='auto' w='100%' maxW='container.xl' flexDir='column' h='90vh'>
          <Center display='flex' flexDir='column' h='50vh' w='50%' bgColor='#D9D9D9' color='white' borderRadius='10px'>
            <LogoUFPS/>
            <Text fontSize='4xl' color='#222222' textAlign='center' margin='30px'>Bienvenido al Prestamo de Salas</Text>
            <LoginGoogle/>
          </Center>
        </Center>
    </Center>
    </>
  )
}

export default Login
