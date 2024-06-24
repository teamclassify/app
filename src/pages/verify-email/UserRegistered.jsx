import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Grid,
  Heading,
  Image,
  Text
} from '@chakra-ui/react'
import { Link } from 'wouter'
import useUser from '../../hooks/useUser.js'

function UserRegistered () {
  const { user } = useUser()

  return (
    <>
      <Box bg="white">
        <Flex
          py={4}
          w="90%"
          mx="auto"
          as="header"
          maxW="container.xl"
          justifyContent="space-between"
        >
          <Flex alignItems="center" gap={4}>
            <Image src="/favicon.ico" alt="Logo" w="30px" />
            <Heading size="md">Préstamo de Salas</Heading>
          </Flex>
        </Flex>
      </Box>

      <Grid minH={'calc(100vh - 200px)'} placeItems={'center'}>
        <form>
          <Card w={'sm'}>
            <CardHeader>
              <Heading as={'h2'} size={'md'}>
                Tu cuenta se ha registrado correctamente
              </Heading>
            </CardHeader>

            <CardBody>
              <Text>
                Revisa tu correo electronico para verificarlo. Debes hacerlo
                para utilizar esta herramienta.
              </Text>
            </CardBody>

            <CardFooter>
              {user?.emailVerified
                ? (
                <Button
                  w={'full'}
                  colorScheme={'primary'}
                  as={Link}
                  to={'/home'}
                >
                  Ya estas verificado, ir al inicio
                </Button>
                  )
                : (
                <Button
                  w={'full'}
                  colorScheme={'primary'}
                  as={Link}
                  to={'/verificar-email'}
                >
                  Enviar correo otra vez
                </Button>
                  )}
            </CardFooter>
          </Card>
        </form>
      </Grid>
    </>
  )
}

export default UserRegistered
