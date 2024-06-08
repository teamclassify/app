import { convertHour12h } from '@/utils/date'
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useToast
} from '@chakra-ui/react'
import { BsPeople } from 'react-icons/bs'
import { FaCheck } from 'react-icons/fa'
import { MdOutlineRateReview } from 'react-icons/md'
import { TiCancel } from 'react-icons/ti'
import { Link } from 'wouter'
import useUser from '../../hooks/useUser.js'
import { useMutation, useQueryClient } from 'react-query'
import LoansService from '../../services/api/LoansService.js'

function LoanItem ({
  id,
  state,
  loan,
  date,
  loanroom,
  roomId,
  building,
  reason,
  people,
  resources,
  user: userLoan,
  hour,
  filterReason,
  filterState,
  handleCancel
}) {
  const queryClient = useQueryClient()
  const toast = useToast()
  const { user } = useUser()

  const BADGE_COLOR = {
    PENDIENTE: 'yellow',
    PREAPROBADO: 'yellow',
    APROBADO: 'green',
    CANCELADO: 'red'
  }

  const { mutate } = useMutation(
    (data) => {
      const promise = LoansService.update(data.id, { estado: data.state })

      toast.promise(promise, {
        success: { title: 'Préstamo actualizado.' },
        error: { title: 'Error al actualizar el préstamo.' },
        loading: { title: 'Actualizando el préstamo.' }
      })

      return promise
    },
    {
      onSuccess: () => {
        queryClient.fetchQuery(['loans', filterState, filterReason])
      }
    }
  )

  const handleClickPreabrobar = () => {
    if (state === 'PREAPROBADO' || state === 'PENDIENTE') {
      mutate({
        id,
        state: state === 'PREAPROBADO' ? 'PENDIENTE' : 'PREAPROBADO'
      })
    }
  }

  const handleClickAprobar = () => {
    if (state === 'PREAPROBADO') {
      mutate({
        id,
        state: 'APROBADO'
      })
    }
  }

  return (
    <Box rounded="md" bg="white">
      <Box p={4}>
        <Flex justifyContent={'space-between'}>
          <Flex gap={4}>
            <MdOutlineRateReview size={24} />

            <Box>
              <Flex gap={2}>
                <Heading
                  size="sm"
                  title="Ver horario"
                  _hover={{
                    textDecoration: 'underline',
                    color: 'primary.400'
                  }}
                >
                  <Link href={`/horario/${roomId}`}>
                    {building} - {loanroom}
                  </Link>
                </Heading>

                <Badge size="sm" colorScheme={BADGE_COLOR[state]}>
                  {state}
                </Badge>
              </Flex>

              <Text mt={1} fontSize="sm">
                {date} de {convertHour12h(hour.start)} a{' '}
                {convertHour12h(hour.end)}
              </Text>

              <Text fontSize="sm" color="gray.500" my={2}>
                Razón: {reason}
              </Text>

              <Flex alignItems="center" gap={2} mb={2}>
                <BsPeople />
                <Text fontSize="sm">{people}</Text>
              </Flex>

              <Flex alignItems="center" gap={2}>
                {resources &&
                  resources.split(',').map((resource, index) => (
                    <Badge key={index} fontSize="xs" colorScheme="blue">
                      {resource}
                    </Badge>
                  ))}
              </Flex>
            </Box>
          </Flex>

          <Box textAlign="right">
            <Avatar src={userLoan.photo} mb={2} />
            <Text
              fontSize="sm"
              title="Ver perfil"
              _hover={{
                textDecoration: 'underline',
                color: 'primary.400'
              }}
            >
              <Link href={`/usuarios/${userLoan.username}`}>
                @{userLoan.username}
              </Link>
            </Text>
          </Box>
        </Flex>
      </Box>

      {state !== 'CANCELADO' && state !== 'REALIZADO' && (
        <Flex
          py={2}
          px={4}
          gap={2}
          borderTopWidth={1}
          justifyContent="end"
          borderColor="gray.200"
        >
          {(user.roles.includes('admin') ||
            user.roles.includes('soporte_tecnico')) &&
            (state === 'PREAPROBADO' || state === 'PENDIENTE') && (
              <Button
                size="sm"
                colorScheme="yellow"
                leftIcon={<FaCheck />}
                onClick={handleClickPreabrobar}
              >
                {state === 'PREAPROBADO'
                  ? 'Quitar Prea-probado'
                  : 'Pre-aprobar'}
              </Button>
          )}

          {user.roles.includes('admin') && (
            <>
              <Button
                size="sm"
                colorScheme="green"
                leftIcon={<FaCheck />}
                onClick={handleClickAprobar}
                isDisabled={state !== 'PREAPROBADO'}
                title={
                  state !== 'PREAPROBADO'
                    ? 'Debe estar pre-aprobado para poder ser aceptado'
                    : ''
                }
              >
                Aceptar
              </Button>

              <Button
                size="sm"
                colorScheme="primary"
                leftIcon={<TiCancel />}
                onClick={() => handleCancel(loan)}
              >
                Cancelar
              </Button>
            </>
          )}
        </Flex>
      )}
    </Box>
  )
}

export default LoanItem
