import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  LinkBox,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from '@chakra-ui/react'
import { FaDoorClosed, FaDoorOpen, FaInfo } from 'react-icons/fa'
import { Link, useLocation } from 'wouter'
import { SlOptionsVertical } from 'react-icons/sl'
import { GiCancel } from 'react-icons/gi'

import { convertHour12h } from '../utils/date'
// import ToolTipo from './ToolTip'
import { MdEdit } from 'react-icons/md'

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
  handleOpenCancel
}) {
  const [, setLocation] = useLocation()

  const backgroundColor =
    state === 'APROBADO'
      ? '#1B9C4A'
      : state === 'PENDIENTE'
        ? 'yellow.400'
        : '#D82D2D'
  let icon
  if (state === 'aprobado') {
    icon = <FaDoorOpen size="2rem" color="white"/>
  } else {
    icon = <FaDoorClosed size="2rem" color="white"/>
  }

  const handleShowInfo = (id) => {
    setLocation(`/prestamo-solicitado/${id}`)
  }

  return (
    <>
      <LinkBox
        p="4"
        w="full"
        as={Link}
        rounded="xl"
        display="flex"
        textAlign="center"
        flexDirection="column"
        backgroundColor={backgroundColor}
        href={''}
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
                rightIcon={<SlOptionsVertical/>}
              ></MenuButton>

              <MenuList p={0}>
                <MenuItem icon={<FaInfo/>} onClick={() => handleShowInfo(id)}>Información</MenuItem>

                {
                  loan.estado !== 'CANCELADO' && <>
                    <MenuItem icon={<MdEdit/>} onClick={() => handleOpenEdit(loan)}>
                      Editar
                    </MenuItem>

                    <MenuItem icon={<GiCancel/>} onClick={() => handleOpenCancel(loan)}>
                      Cancelar
                    </MenuItem>
                  </>
                }
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

          <Flex w="full" gap={1}>
            <Badge colorScheme={loan.estado === 'CANCELADO' ? 'red' : 'yellow'}>{date}</Badge>

            <Badge colorScheme={loan.estado === 'CANCELADO' ? 'red' : 'yellow'}>
              {convertHour12h(startHour)} - {convertHour12h(endHour)}
            </Badge>
          </Flex>
        </Box>
      </LinkBox>
    </>
  )
}

export default Loan
