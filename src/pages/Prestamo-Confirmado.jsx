import { Box, Heading, Card, CardBody, Text } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import Wrapper from '../components/Wrapper'

function Prestamo () {
  return (
    <>
      <Wrapper>
        <Box
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          h="80vh"
        >
          <CheckIcon w="20%" h="20%" color="green" />
          <Heading p={5}>¡Su solicitud ha sido realizado con éxito!</Heading>
          <Box display='flex' flexDir='row' gap={2}>
            <Card bg='none' border='2px solid #D9D9D9'>
              <CardBody p={3}>
                <Text>
                  SA-404
                </Text>
              </CardBody>
            </Card>
            <Card bg='none' border='2px solid #D9D9D9'>
              <CardBody p={3}>
                <Text>
                  22 de Marzo, 4:00 pm
                </Text>
              </CardBody>
            </Card>
          </Box>
        </Box>
      </Wrapper>
    </>
  )
}

export default Prestamo
