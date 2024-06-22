import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useToast
} from '@chakra-ui/react'
import { FaCheck, FaInfoCircle, FaRegBuilding } from 'react-icons/fa'
import { useMutation, useQueryClient } from 'react-query'
import moment from 'moment'

import useUser from '../../hooks/useUser.js'
import AnomaliesService from '../../services/api/AnomaliesService.js'

function AnomalieItem ({
  id,
  descripcion,
  sala,
  estado,
  edificio,
  usuario_nombre,
  usuario_photo,
  usuario_correo,
  createdAt,
  updatedAt,
  filterDescription,
  filterState,
  page
}) {
  const queryClient = useQueryClient()
  const toast = useToast()
  const { user } = useUser()

  const { mutate, isLoading } = useMutation(
    (data) => {
      const promise = AnomaliesService.update(data)

      toast.promise(promise, {
        success: { title: 'Anomalía actualizada.' },
        error: { title: 'Error al actualizar la anomalía.' },
        loading: { title: 'Actualizando la anomalía.' }
      })

      return promise
    },
    {
      onSuccess: (data) => {
        if (data?.success) {
          queryClient.fetchQuery([
            'anomalies',
            filterState,
            filterDescription,
            page
          ])
        } else {
          toast({
            title: 'Error',
            description: data.message,
            status: 'error',
            duration: 5000,
            isClosable: true
          })
        }
      }
    }
  )

  const handleClickCheck = () => {
    if (!id) return

    mutate({
      id,
      estado: 'SOLUCIONADO'
    })
  }

  return (
    <Box rounded="md" bg="white">
      <Flex pt={4} px={4} gap={4} alignItems={'center'}>
        <FaRegBuilding size={24} />

        <Box>
          <Flex gap={2}>
            <Heading size="sm" title="Ver horario">
              {edificio} - {sala}
            </Heading>
          </Flex>
        </Box>
      </Flex>

      <Text pl={14}>{moment(createdAt).format('DD-MM-YYYY, h:mm:ss a')}</Text>

      <Box p={4} pl={14}>
        <Text fontWeight={'bold'}>Descripción</Text>
        <Text>{descripcion}</Text>
      </Box>

      <Box pb={4} pl={14}>
        <Text fontWeight={'bold'} mb={2}>
          Notificador de la anomalía
        </Text>

        <Flex gap={4}>
          <Avatar src={usuario_photo} mb={2} />
          <Box>
            <Text fontSize="sm">{usuario_nombre}</Text>
            <Text fontSize="sm">{usuario_correo}</Text>
          </Box>
        </Flex>
      </Box>

      <Flex
        py={2}
        px={4}
        gap={2}
        borderTopWidth={1}
        alignItems={'center'}
        justifyContent="space-between"
        borderColor="gray.200"
      >
        <Text fontSize={'sm'} display={'flex'} alignItems={'center'} gap={2}>
          {estado === 'SOLUCIONADO' && (
            <>
              <FaInfoCircle />
              Marcado como solucionado el{' '}
              {moment(updatedAt).format('DD-MM-YYYY, h:mm:ss a')}
            </>
          )}
        </Text>

        {(user?.roles.includes('admin') ||
          user?.roles.includes('soporte_tecnico')) && (
          <>
            <Button
              size="sm"
              colorScheme="green"
              isLoading={isLoading}
              isDisabled={isLoading || estado === 'SOLUCIONADO'}
              leftIcon={<FaCheck />}
              onClick={handleClickCheck}
            >
              Solucionado
            </Button>
          </>
        )}
      </Flex>
    </Box>
  )
}

export default AnomalieItem
