import { Card, CardHeader, CardBody, CardFooter, Text, Heading, Box } from '@chakra-ui/react'

function Loan(){
  const {title, status} = 'Not Set'
  const date = '12-31-2077'

  return(<>
    <Card boxShadow='md'>
  <CardBody display='flex' outline='2px'> 
  <Box>
        <Heading size='xs' textTransform='uppercase'>
          SA 404
        </Heading>
        <Text pt='2' fontSize='sm'>
          ESTADO : Rechazado
        </Text>
      </Box>
  </CardBody>
</Card>
  </>)
}

export default Loan