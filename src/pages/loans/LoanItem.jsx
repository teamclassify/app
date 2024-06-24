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
  type,
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
  page,
  handleCancel,
  handleInfo
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
      const promise = LoansService.update(data.id, data.data)

      toast.promise(promise, {
        success: { title: 'Préstamo actualizado.' },
        error: { title: 'Error al actualizar el préstamo.' },
        loading: { title: 'Actualizando el préstamo.' }
      })

      return promise
    },
    {
      onSuccess: (data) => {
        if (data?.success) {
          queryClient.fetchQuery(['loans', filterState, filterReason, page])
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

  const handleClickAprobar = () => {
    if (state === 'PENDIENTE') {
      mutate({
        id,
        data: {
          estado: 'APROBADO',
          edificio: building,
          sala: loanroom
        }
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

                <Badge size="sm" colorScheme={'blue'}>
                  {type}
                </Badge>
              </Flex>

              <Text mt={1} fontSize="sm">
                {loan.tipo === 'UNICO'
                  ? (
                  <>
                    {date} de {convertHour12h(hour.start)} a{' '}
                    {convertHour12h(hour.end)}
                  </>
                    )
                  : (
                  <>
                    {loan?.dias?.split(',').map((dia, index) => (
                      <p key={dia}>
                        {dia.toUpperCase()} -{' '}
                        {convertHour12h(loan?.horas_inicio?.split(',')[index])}{' '}
                        a {convertHour12h(loan?.horas_fin?.split(',')[index])}
                      </p>
                    ))}
                  </>
                    )}
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

            <Text fontSize="sm">{userLoan.name}</Text>

            <Text
              fontSize="sm"
              title="Ver perfil"
              _hover={{
                textDecoration: 'underline',
                color: 'primary.400'
              }}
            >
              {userLoan.email}
            </Text>

            <Badge colorScheme={'blue'}>{userLoan.role}</Badge>
          </Box>
        </Flex>
      </Box>

      {state !== 'CANCELADO' && state !== 'REALIZADO' && (
        <Flex justifyContent="space-between" py={2} px={4} borderTopWidth={1}>
          <Button size="sm" colorScheme="blue" onClick={() => handleInfo(loan)}>
            Feedback
          </Button>
          <Flex gap={2} justifyContent="end" borderColor="gray.200">
            {(user.roles.includes('admin') ||
              user.roles.includes('soporte_tecnico')) &&
              (state === 'PREAPROBADO' || state === 'PENDIENTE') && (
                <Button
                  size="sm"
                  colorScheme="yellow"
                  leftIcon={<FaCheck />}
                  onClick={handleClickAprobar}
                >
                  {state === 'PREAPROBADO'
                    ? 'Quitar Pre-aprobado'
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
        </Flex>
      )}
    </Box>
  )
}

export default LoanItem
