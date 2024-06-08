import { CheckIcon } from '@chakra-ui/icons'
import {
  Box,
  Card,
  CardBody,
  Center,
  Heading,
  Spinner,
  Text
} from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { useParams } from 'wouter'

import LoanService from '@/services/api/LoansService'
import Wrapper from '../components/Wrapper'
import LoanNotFound from './LoanNotFound'
import { convertHour12h } from '../utils/date.js'

function LoanSuccess () {
  const params = useParams()
  const id = params.id

  const { data, isLoading } = useQuery(['loan', id], () =>
    LoanService.getById(id)
  )

  if (!isLoading && !data) {
    return <LoanNotFound />
  }

  return (
    <>
      <Wrapper>
        {isLoading
          ? (
          <Center minH="100vh" flexDir="column" gap={4}>
            <Spinner size="lg" />
            <Text>Cargando...</Text>
          </Center>
            )
          : (
          <Box
            textAlign="center"
            display="flex"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            h="80vh"
          >
            <CheckIcon w="20%" h="20%" color="green" />
            <Heading mt={4} size="lg">
              ¡Su solicitud ha sido realizado con éxito!
            </Heading>
            <Text mb={4}>
              Su solicitud ha sido enviada con éxito, en breve recibirá un
              correo con la confirmación de su solicitud.
            </Text>

            <Box display="flex" gap={2}>
              <Card bg="white" border="2px solid #D9D9D9" shadow="none">
                <CardBody p={3}>
                  <Text>
                    {data.edificio} - {data.sala}
                  </Text>
                </CardBody>
              </Card>

              <Card bg="white" border="2px solid #D9D9D9" shadow="none">
                <CardBody p={3}>
                  <Text>
                    {data.fecha}, {convertHour12h(data.hora_inicio)} -{' '}
                    {convertHour12h(data.hora_fin)}
                  </Text>
                </CardBody>
              </Card>

              <Card bg="white" border="2px solid #D9D9D9" shadow="none">
                <CardBody p={3}>
                  <Text>{data.estado}</Text>
                </CardBody>
              </Card>
            </Box>

            <Box mt={4} w="full" display="flex" justifyContent="center">
              <Card
                mb={4}
                bg="white"
                border="2px solid #D9D9D9"
                shadow="none"
                w="100%"
                maxW="sm"
              >
                <CardBody p={3}>
                  <Text>{data.razon}</Text>
                </CardBody>
              </Card>
            </Box>
          </Box>
            )}
      </Wrapper>
    </>
  )
}

export default LoanSuccess
