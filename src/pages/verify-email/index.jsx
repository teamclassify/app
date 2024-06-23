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
  Input
} from '@chakra-ui/react'

function VerifyEmail () {
  const handleVerifyEmail = (e) => {
    e.preventDefault()
  }

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
        <form onSubmit={handleVerifyEmail}>
          <Card w={'sm'}>
            <CardHeader>
              <Heading as={'h2'} size={'md'}>
                Verifica tu correo
              </Heading>
            </CardHeader>

            <CardBody>
              <Input
                type={'email'}
                placeholder={'Correo electronico...'}
                isRequired
              />
            </CardBody>

            <CardFooter>
              <Button w={'full'} colorScheme={'primary'} type={'submit'}>
                Verificar
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Grid>
    </>
  )
}

export default VerifyEmail
