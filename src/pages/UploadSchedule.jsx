import { CheckIcon, DownloadIcon } from '@chakra-ui/icons'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  AspectRatio,
  Box,
  Button,
  Card,
  CardBody,
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

export default function UploadSchedule () {
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

  const { data, mutate, isLoading } = useMutation((file) => {
    const promise = UploadService.uploadSchedule(file)
    toast.promise(promise, {
      success: { title: 'Archivo subido' },
      error: { title: 'Error al subir el archivo' },
      loading: { title: 'Cargando archivo' }
    })
    return promise
  })

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    const title = ['Listo', 'Error']
    const description = [
      'Su archivo ha sido cargado exitosamente',
      'Solo se permite archivos excel'
    ]
    const status = ['success', 'error']
    let index = 0
    if (
      !file.type.includes('text/csv') &&
      !file.type.includes(
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) &&
      !file.type.includes('application/vnd.ms-excel')
    ) {
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
        description: 'Vuelve a subir el archivo excel',
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }
  }

  if (!loading && !user) return <NotAuth />

  if (!loading && user && !user.roles.includes('admin')) {
    return <NotAuth />
  }

  return (
    <Wrapper>
      {data && data.data && data.data.message && (
        <Alert rounded="md" status="success" variant="solid">
          <AlertIcon />
          <Box>
            <AlertTitle>{data.data.message}</AlertTitle>
            <AlertDescription>
              El archivo ha sido cargado exitosamente y se ha empezado a
              procesar, este proceso puede tardar unos minutos.
            </AlertDescription>
          </Box>
        </Alert>
      )}

      <Box display={{ base: 'block', lg: 'flex' }} flexDir="row" gap={4}>
        <Box w="100%">
          <Heading as="h2" size="md" noOfLines={1} p="20px 0px">
            Cargar horario
          </Heading>
          <AspectRatio maxW="800px" ratio={16 / 8}>
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
                          <Text
                            fontSize="md"
                            color="gray.700"
                            fontWeight="bold"
                          >
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
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  onDragEnter={startAnimation}
                  onDragLeave={stopAnimation}
                  onChange={handleFileUpload}
                />
              </Box>
            </Box>
          </AspectRatio>
        </Box>
        <Box w="100%" margin="0 8px">
          <Heading as="h2" size="md" noOfLines={1} p="20px 0px">
            Archivo subido
          </Heading>
          {fileName && (
            <>
              <Card>
                <CardBody
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text>{fileName}</Text>
                  <CheckIcon color="green" />
                </CardBody>
              </Card>
            </>
          )}
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end" p={4}>
        <Button
          size="sm"
          colorScheme="primary"
          onClick={handleSubmit}
          isDisabled={isLoading}
          isLoading={isLoading}
        >
          Confirmar
        </Button>
      </Box>
    </Wrapper>
  )
}
