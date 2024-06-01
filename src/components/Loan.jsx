import { Badge, Box, Flex, Heading, LinkBox } from '@chakra-ui/react'
import { FaDoorClosed, FaDoorOpen } from 'react-icons/fa'
import { Link } from 'wouter'

import { convertHour12h } from '../utils/date'
import ToolTipo from './ToolTip'

function Loan ({ id, state, date, loanroom, building, startHour, endHour }) {
  const backgroundColor =
    state === 'APROBADO'
      ? '#1B9C4A'
      : state === 'PENDIENTE'
        ? 'yellow.400'
        : '#D82D2D'
  let icon
  if (state === 'aprobado') {
    icon = <FaDoorOpen size="2rem" color="white" />
  } else {
    icon = <FaDoorClosed size="2rem" color="white" />
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
        href={`/prestamo-solicitado/${id}`}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {icon}
          <ToolTipo State={state} />
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
            <Badge colorScheme="yellow">{date}</Badge>

            <Badge colorScheme="yellow">
              {convertHour12h(startHour)} - {convertHour12h(endHour)}
            </Badge>
          </Flex>
        </Box>
      </LinkBox>
    </>
  )
}

export default Loan
