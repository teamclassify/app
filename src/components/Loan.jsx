import {
  LinkBox,
  LinkOverlay,
  Box,
  Heading,
  Badge
} from '@chakra-ui/react'
import { FaDoorOpen, FaDoorClosed } from 'react-icons/fa'
import { Link } from 'wouter'
import ToolTipo from './ToolTip'

function Loan ({ state, date, loanroom }) {
  const backgroundColor = state === 'aprobado' ? '#1B9C4A' : state === 'pendiente' ? '#EDD038' : '#D82D2D'
  let icon
  if (state === 'aprobado') {
    icon = <FaDoorOpen size="50px" color="white" />
  } else {
    icon = <FaDoorClosed size="50px" color="white" />
  }

  return (
    <>
      <LinkBox
        textAlign="center"
        maxW="sm"
        p="8"
        rounded="xl"
        backgroundColor= {backgroundColor}
        display="flex"
        flexDirection="column"
        width="14rem"
      >
        <LinkOverlay as={Link} href="">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {icon}
            <ToolTipo State={state}/>
          </Box>
          <Box display="flex" flexDirection="column" mt={2} alignItems="start">
            <Heading
              fontWeight="bold"
              size="md"
              my="2"
              fontFamily="sans-serif"
              color="white"
            >
            </Heading>
            <Badge bg='#ffffff24' color="white" fontFamily="sans-serif">
              {date}
            </Badge>
          </Box>
        </LinkOverlay>
      </LinkBox>
    </>
  )
}

export default Loan
