import { convertHour12h } from '@/utils/date'
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Text
} from '@chakra-ui/react'
import { BsPeople } from 'react-icons/bs'
import { FaCheck } from 'react-icons/fa'
import { MdOutlineRateReview } from 'react-icons/md'
import { TiCancel } from 'react-icons/ti'
import { Link } from 'wouter'

function LoanItem ({
  state,
  date,
  loanroom,
  roomId,
  building,
  reason,
  people,
  resources,
  user,
  hour
}) {
  return (
    <Box rounded="md" bg="white">
      <Box p={2} pb={4}>
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

                <Badge
                  size="sm"
                  colorScheme={state === 'PENDIENTE' ? 'yellow' : 'gray'}
                >
                  {state}
                </Badge>
              </Flex>

              <Text fontSize="xs">
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
                  resources.split(',').map((resource) => (
                    <Badge key={resource.id} fontSize="xs" colorScheme="blue">
                      {resource}
                    </Badge>
                  ))}
              </Flex>
            </Box>
          </Flex>

          <Box textAlign="right">
            <Avatar src={user.photo} mb={2} />
            <Text
              fontSize="sm"
              title="Ver perfil"
              _hover={{
                textDecoration: 'underline',
                color: 'primary.400'
              }}
            >
              <Link href={`/usuarios/${user.username}`}>@{user.username}</Link>
            </Text>
          </Box>
        </Flex>
      </Box>

      <Flex
        p={2}
        gap={2}
        borderTopWidth={1}
        justifyContent="end"
        borderColor="gray.200"
      >
        <Button size="sm" colorScheme="green" leftIcon={<FaCheck />}>
          Aceptar
        </Button>

        <Button size="sm" colorScheme="primary" leftIcon={<TiCancel />}>
          Cancelar
        </Button>
      </Flex>
    </Box>
  )
}

export default LoanItem
