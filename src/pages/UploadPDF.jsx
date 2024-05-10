import { CheckIcon, DownloadIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Image,
  Heading,
  Input,
  Stack,
  Text,
  useToast
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useMutation } from 'react-query'

import Wrapper from '../components/Wrapper'
import useUser from '../hooks/useUser'
import UploadService from '../services/api/UploadService'
import NotAuth from './NotAuth'

export default function App () {
  const { user, loading } = useUser()

  const [file, setFile] = useState()
  const [fileName, setFileName] = useState()

  const toast = useToast()

  const startAnimation = () => {
    document.getElementById('uploadDocument').style.backgroundColor = '#8ACDFF'
  }
  const stopAnimation = () => {
    document.getElementById('uploadDocument').style.backgroundColor = 'white'
  }

  const { mutate } = useMutation((file) => {
    const promise = UploadService.create(file)
    /*
    toast.promise(promise, {
      success: { title: 'Archivo subido' },
      error: { title: 'Error al subir el archivo' },
      loading: { title: 'Cargando archivo' }
    })
    */
    return promise
  })

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    const title = ['Listo', 'Error']
    const description = [
      'Su archivo ha sido cargado exitosamente',
      'Solo se permite archivos pdf'
    ]
    const status = ['success', 'error']
    let index = 0
    if (file.type !== 'application/pdf') {
      index += 1
      setFile(null)
      setFileName('')
      document.getElementById('uploadDocument').style.backgroundColor = 'white'
    } else {
      setFile(file)
      setFileName(file.name)
      document.getElementById('uploadDocument').style.backgroundColor =
        '#DDE8E3'
    }
    toast({
      title: title[index],
      description: description[index],
      status: status[index],
      duration: 9000,
      isClosable: true
    })
  }

  const handleSubmit = () => {
    if (file) {
      mutate(file)
    } else {
      toast({
        title: 'Error',
        description: 'Vuelve a subir el archivo pdf',
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }
  }

  if (!loading && user && !user.roles.includes('admin')) {
    return <NotAuth />
  }

  return (
    <Wrapper>
      <Box
        display={{ base: 'block', md: 'flex' }}
        flexDir="row"
        gap={4}
        minH="calc(100vh - 200px)"
      >
        <Box w="100%" h="full">
          <Heading as="h2" size="md" noOfLines={1} p="20px 0px">
            Cargar horario
          </Heading>

          <Box
            id="uploadDocument"
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
            <Box
              position="relative"
              minH={{ base: 'calc(50vh - 100px)', md: 'calc(100vh - 200px)' }}
              width="100%"
            >
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
                  <Box
                    display="flex"
                    height="100%"
                    width="100%"
                    textAlign="center"
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                  >
                    {file
                      ? (
                      <Box>
                        <CheckIcon h="16" w="16" />
                        <Text fontSize="md" color="gray.700" fontWeight="bold">
                          Su archivo ha sido cargado
                        </Text>
                      </Box>
                        )
                      : (
                      <Box>
                        <DownloadIcon h="16" w="16" />
                        <Stack p="2" textAlign="center" spacing="1">
                          <Heading
                            fontSize="lg"
                            color="gray.700"
                            fontWeight="bold"
                          >
                            Arrastra y suelta el archivo
                          </Heading>
                          <Text fontWeight="light">
                            o click para seleccionar
                          </Text>
                        </Stack>
                      </Box>
                        )}
                  </Box>
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
        </Box>

        <Box w="100%" margin="0 8px">
          <Heading as="h2" size="md" noOfLines={1} p="20px 0px">
            Archivo subido
          </Heading>

          {fileName && (
            <>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                bg="white"
                flexDir="column"
                minH={{ base: 'calc(50vh - 100px)', md: 'calc(100vh - 200px)' }}
              >
                <Image src="/public/assets/pdf.png" w="20%" />
                <Text p={3}>{fileName}</Text>
              </Box>
            </>
          )}
        </Box>
      </Box>

      <Box display="flex" justifyContent="flex-end" p={4}>
        <Button colorScheme="primary" size="md" onClick={handleSubmit}>
          Confirmar
        </Button>
      </Box>
    </Wrapper>
  )
}
