import { LinkBox, LinkOverlay, Heading, Box, SimpleGrid } from '@chakra-ui/react'
import { IoIosAddCircle } from "react-icons/io"
import { IoMdWarning } from "react-icons/io";

function userOptions(){
  return(
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
      <LinkBox  boxShadow='md' textAlign='center' mt='2rem' as='article' maxW='sm' p='4' borderWidth='1px' rounded='md' pb='1rem'>
  <Heading size='md' my='2'>
    <LinkOverlay href='' fontSize='2rem'>
      Solicitar Prestamo
    </LinkOverlay>
  </Heading>
  <Box p='1rem' display='flex' alignItems='center' justifyContent='center'>
  <IoIosAddCircle size='70px'/>
</Box>
</LinkBox>

<LinkBox boxShadow='md' textAlign='center' mt='2rem' as='article' maxW='sm' p='4' borderWidth='1px' rounded='md' pb='1rem'>
  <Heading size='md' my='2'>
    <LinkOverlay href='' fontSize='2rem'>
      Reportar Fallo
    </LinkOverlay>
  </Heading>
  <Box p='1rem' display='flex' alignItems='center' justifyContent='center'>
  <IoMdWarning size='70px'/>
</Box>
</LinkBox>

    </SimpleGrid>

  )
}

export default userOptions