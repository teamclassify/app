import { LinkBox, LinkOverlay, Box, Heading, Text } from '@chakra-ui/react'
import { FaDoorOpen } from 'react-icons/fa'
import { Link } from 'wouter'

function Loan () {
  /* const { title, status } = 'Not Set'
  const date = '12-31-2077' */

  return (<>
    <LinkBox
        textAlign="center"
        maxW="sm"
        p="8"
        rounded='xl'
        backgroundColor="rgb(27 156 75)"
        display='flex'
        flexDirection='column'
        width='14rem'
      >
          <LinkOverlay as={Link} href="">
          <Box display='flex' flexDirection='row' justifyContent='space-between'>
            <FaDoorOpen size="50px" color="white" ></FaDoorOpen>
            </Box>
            <Box display='flex' flexDirection='column' mt={2} alignItems='start'>
            <Heading fontWeight='bold' size="md" my="2" fontFamily="sans-serif" color='white'>SA414</Heading>
            <Text color='white' fontFamily='sans-serif'>28/4/2024</Text></Box>
          </LinkOverlay>
    </LinkBox>
  </>)
}

export default Loan
