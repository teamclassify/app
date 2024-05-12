import { CheckIcon } from '@chakra-ui/icons'
import { Box, Card, CardBody, Heading, Spinner, Text } from '@chakra-ui/react'
import moment from 'moment'
import { useQuery } from 'react-query'
import { useParams } from 'wouter'

import LoanService from '@/services/api/LoansService'
import Wrapper from '../components/Wrapper'
import LoanNotFound from './LoanNotFound'

function LoanSuccess () {
  const params = useParams()
  const id = params.id

  const { data, isLoading } = useQuery(['loan', id], () =>
    LoanService.getById(id)
  )

  if (isLoading) {
    return <Spinner />
  }

  if (!isLoading && !data) {
    return <LoanNotFound />
  }

  return (
    <>
      <Wrapper>
        <Box
          textAlign='center'
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          h="80vh"
        >
          <CheckIcon w="20%" h="20%" color="green" />
          <Heading mt={4} size='lg'>¡Su solicitud ha sido realizado con éxito!</Heading>
          <Text mb={4}>
            Su solicitud ha sido enviada con éxito, en breve recibirá un correo
            con la confirmación de su solicitud.
          </Text>

          <Box display="flex" flexDir="row" gap={2}>
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
                  {moment(new Date(data.fecha)).format('DD MMM YYYY')},{' '}
                  {data.hora_inicio} - {data.hora_fin}
                </Text>
              </CardBody>
            </Card>
          </Box>
        </Box>
      </Wrapper>
    </>
  )
}

export default LoanSuccess
