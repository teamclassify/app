import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from '@chakra-ui/react'
import { FaDoorClosed, FaDoorOpen, FaInfo } from 'react-icons/fa'
import { useLocation } from 'wouter'
import { SlOptionsVertical } from 'react-icons/sl'
import { GiCancel } from 'react-icons/gi'
import { MdEdit, MdSmsFailed } from 'react-icons/md'
import { VscFeedback } from 'react-icons/vsc'

import { convertHour12h, isMayorDate } from '../utils/date'

const BADGE_COLOR = {
  PENDIENTE: 'yellow',
  PREAPROBADO: 'yellow',
  APROBADO: 'green',
  CANCELADO: 'red'
}

function Loan ({
  id,
  loan,
  state,
  date,
  loanroom,
  building,
  startHour,
  endHour,
  handleOpenEdit,
  handleOpenCancel,
  handleOpenFeedback
}) {
  const [, setLocation] = useLocation()

  const backgroundColor =
    state === 'APROBADO'
      ? '#1B9C4A'
      : state === 'PENDIENTE' || state === 'PREAPROBADO'
        ? 'yellow.400'
        : '#D82D2D'
  let icon
  if (state === 'aprobado') {
    icon = <FaDoorOpen size="2rem" color="white" />
  } else {
    icon = <FaDoorClosed size="2rem" color="white" />
  }

  const handleShowInfo = (id) => {
    setLocation(`/prestamo-solicitado/${id}`)
  }

  const handleShowAnomalie = () => {
    setLocation(`/anomalias/nueva/${id}`)
  }

  return (
    <>
      <Box
        p="4"
        w="full"
        rounded="xl"
        display="flex"
        textAlign="center"
        flexDirection="column"
        backgroundColor={backgroundColor}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {icon}

          <Flex alignItems="center">
            {/* <ToolTipo State={state}/> */}

            <Menu>
              <MenuButton
                as={Button}
                size={'sm'}
                variant="none"
                iconSpacing={0}
                color="white"
                rightIcon={<SlOptionsVertical />}
              ></MenuButton>

              <MenuList p={0}>
                <MenuItem icon={<FaInfo />} onClick={() => handleShowInfo(id)}>
                  Información
                </MenuItem>

                {loan.estado === 'APROBADO' &&
                  isMayorDate(
                    new Date(),
                    new Date(`${date} ${endHour}:00:00`)
                  ) && (
                    <MenuItem
                      icon={<MdSmsFailed />}
                      onClick={() => handleShowAnomalie(id)}
                    >
                      Reportar anomalía
                    </MenuItem>
                )}

                {loan.estado !== 'CANCELADO' && loan.estado !== 'APROBADO' && (
                  <MenuItem
                    icon={<MdEdit />}
                    onClick={() => handleOpenEdit(loan)}
                  >
                    Editar
                  </MenuItem>
                )}

                {loan.estado !== 'CANCELADO' && (
                  <MenuItem
                    icon={<GiCancel />}
                    onClick={() => handleOpenCancel(loan)}
                  >
                    Cancelar
                  </MenuItem>
                )}

                {loan.estado === 'APROBADO' && (
                  <MenuItem
                    icon={<VscFeedback />}
                    onClick={() => handleOpenFeedback(loan)}
                  >
                    Cuéntanos tu experiencia
                  </MenuItem>

                )}
              </MenuList>
            </Menu>
          </Flex>
        </Box>

        <Box display="flex" flexDirection="column" mt={2} alignItems="start">
          <Heading
            my="2"
            size="sm"
            color="white"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            {building} - {loanroom}
          </Heading>

          {loan.tipo === 'UNICO'
            ? (
            <Flex flexDir={'column'} textAlign={'left'} w={'auto'}>
              <Badge mb={1} colorScheme={BADGE_COLOR[loan.estado]}>
                {date}
              </Badge>
              <Badge colorScheme={BADGE_COLOR[loan.estado]}>
                {convertHour12h(startHour)} a {convertHour12h(endHour)}
              </Badge>
            </Flex>
              )
            : (
            <>
              {loan?.dias?.split(',').map((dia, index) => (
                <Badge mb={1} key={dia} colorScheme={BADGE_COLOR[loan.estado]}>
                  {dia.toUpperCase()} -{' '}
                  {convertHour12h(loan?.horas_inicio?.split(',')[index])} a{' '}
                  {convertHour12h(loan?.horas_fin?.split(',')[index])}
                </Badge>
              ))}
            </>
              )}
        </Box>
      </Box>
    </>
  )
}

export default Loan
