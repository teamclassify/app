import { Card, CardBody } from '@chakra-ui/react'

function Carda ({ children }) {
  return (<>
  <Card my={6} display="inline-block">
  <CardBody>
    {children}
  </CardBody>
</Card>
  </>)
}

export default Carda
