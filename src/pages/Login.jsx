import { Text, Box, Image } from '@chakra-ui/react'
import LogoUFPS from '../components/Logos/LogoUFPS'
import LoginGoogle from '../components/ButtonGoogle'

function Login () {
  return (
    <>
      <Box>
        <Image src='/assets/background-red.jpg' pos="absolute" top={0} left={0} right={0} bottom={0} zIndex={-1} w="full" h="100vh" />
      </Box>

      <Box h="calc(100vh - 150px)" display="grid" placeItems="center" >
          <Box
            py={10}
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            w="50%"
            bgColor="white"
            color="white"
            borderRadius="10px"
          >
            <LogoUFPS />
            <Text
              fontSize="4xl"
              color="#222222"
              textAlign="center"
              margin="10px"
            >
            </Text>
            <LoginGoogle />
          </Box>
      </Box>
    </>
  )
}

export default Login
