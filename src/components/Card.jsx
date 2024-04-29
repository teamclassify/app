import { Card, Text, CardBody, Badge } from '@chakra-ui/react'

function Carda () {
  return (<>
  <Card my={8} w='36%'>
  <CardBody>
    <Text><Badge>Tú PRESTAMO puede estar</Badge>: <Badge colorScheme='yellow'>EN ESPERA</Badge> <Badge colorScheme='green'>APROBADO</Badge> <Badge colorScheme='red'>RECHAZADO</Badge></Text>
  </CardBody>
</Card>
  </>)
}

export default Carda
