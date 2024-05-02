import { useState } from 'react'
import {
  AspectRatio,
  Box,
  Button,
  Container,
  Heading,
  Input,
  Stack,
  Text
} from '@chakra-ui/react'
import { DownloadIcon } from '@chakra-ui/icons'
import { motion, useAnimation } from 'framer-motion'

export default function App () {
  const [fileName, setFileName] = useState('')

  const controls = useAnimation()
  const startAnimation = () => controls.start('hover')
  const stopAnimation = () => controls.stop()

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    setFileName(file.name)
    console.log(file)
  }

  return (
    <Container my="12">
      <Heading as="h2" size="xl" noOfLines={1} p="10px">
        Cargar Horario
      </Heading>
      <AspectRatio w="800px" ratio={16 / 8}>
        <Box
          borderColor="gray.300"
          borderStyle="dashed"
          borderWidth="2px"
          rounded="md"
          shadow="sm"
          role="group"
          transition="all 150ms ease-in-out"
          _hover={{
            shadow: 'md'
          }}
          as={motion.div}
          initial="rest"
          animate="rest"
          whileHover="hover"
        >
          <Box position="relative" height="100%" width="100%">
            <Box
              position="absolute"
              height="100%"
              width="100%"
              display="flex"
              flexDirection="column"
            >
              <Stack
                height="100%"
                width="100%"
                display="flex"
                alignItems="center"
                justify="center"
                spacing="4"
              >
                <Box height="16" width="16" position="relative">
                  <DownloadIcon w="100%" h="100%" />
                </Box>
                <Stack p="2" textAlign="center" spacing="1">
                  <Heading fontSize="lg" color="gray.700" fontWeight="bold">
                    Arrastra y suelta el archivo
                  </Heading>
                  <Text fontWeight="light">o click para seleccionar</Text>
                </Stack>
              </Stack>
            </Box>
            <Input
              id='document'
              type="file"
              height="100%"
              width="100%"
              position="absolute"
              top="0"
              left="0"
              opacity="0"
              aria-hidden="true"
              accept="pdf/*"
              onDragEnter={startAnimation}
              onDragLeave={stopAnimation}
              onChange={handleFileUpload}
            />
          </Box>
        </Box>
      </AspectRatio>
      <Heading as="h2" size="xl" noOfLines={1} p="10px">
        Archivo subido
      </Heading>
      <Box bgColor='gray' w='100%'>
       {fileName}
       </Box>
      <Button colorScheme='blue'>Confirmar</Button>
    </Container>
  )
}
