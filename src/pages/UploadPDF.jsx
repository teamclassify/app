import { useState } from 'react'
import {
  AspectRatio,
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Input,
  Stack,
  Text
} from '@chakra-ui/react'
import { DownloadIcon } from '@chakra-ui/icons'
import { motion, useAnimation } from 'framer-motion'
import Wrapper from '../components/Wrapper'

export default function App () {
  const [fileName, setFileName] = useState('')

  const controls = useAnimation()
  const startAnimation = () => controls.start('hover')
  const stopAnimation = () => controls.stop()

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    setFileName(file.name)
    /*
    if (file) {
      const formData = new FormData()
      formData.append('file', file)

      try {
        const response = fetch('https://classify-api.vercel.app/api', {
          method: 'POST',
          body: formData
        })

        if (response.ok) {
          console.log('Archivo subido exitosamente')
        } else {
          console.error('Error al subir el archivo')
        }
      } catch (error) {
        console.error('Error durante la subida', error)
      }
    }
    */
  }

  return (
    <Wrapper>
      <Box>
        <Heading as="h2" size="xl" noOfLines={1} p="20px 0px">
          Cargar Horario
        </Heading>
        <AspectRatio maxW="800px" ratio={16 / 8}>
          <Box
            bgColor="white"
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
                id="document"
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
        <Heading as="h2" size="xl" noOfLines={1} p="20px 0px">
          Archivo subido
        </Heading>
        {fileName && (
          <>
            <Card>
              <CardBody>
                <Text>{fileName}</Text>
              </CardBody>
            </Card>
          </>
        )}
        <Box display="flex" justifyContent="flex-end" p={4}>
          <Button colorScheme="primary" size="sm">
            Confirmar
          </Button>
        </Box>
      </Box>
    </Wrapper>
  )
}
