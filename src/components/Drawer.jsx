import { Box, Button, Divider, Heading } from '@chakra-ui/react'
import { FaComputer } from 'react-icons/fa6'
import { GrSchedule } from 'react-icons/gr'
import { IoPersonSharp } from 'react-icons/io5'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { Link } from 'wouter'

import useUser from '../hooks/useUser'
import UserPic from './UserPic'

function DrawerForm () {
  const { user, logout } = useUser()

  return (
    <Box
      p={4}
      minH="100vh"
      bg="rgb(196 38 38)"
      alignItems="start"
      flexDirection="column"
      justifyContent="space-between"
      display={{ base: 'none', md: 'flex' }}
    >
      <Box>
        <Box display="flex" justifyContent="center" mb={6}>
          <UserPic />
        </Box>

        {user && <Divider mb={4} borderColor="primary.400" borderWidth={1} />}

        <Button
          gap={2}
          w="full"
          as={Link}
          href="/home"
          bg="transparent"
          colorScheme="red"
          justifyContent="start"
        >
          <IoPersonSharp size="13px" color="white" />
          <Heading as="h1" size="sl" py={2}>
            Inicio
          </Heading>
        </Button>

        <Button
          gap={2}
          w="full"
          as={Link}
          href="/horario"
          bg="transparent"
          colorScheme="red"
          justifyContent="start"
        >
          <GrSchedule size="13px" color="white" />
          <Heading as="h1" size="sl" color="white" py={2}>
            Horario
          </Heading>
        </Button>

        <Button
          gap={2}
          w="full"
          as={Link}
          href="/prestamos"
          bg="transparent"
          colorScheme="red"
          justifyContent="start"
        >
          <FaComputer size="13px" color="white" />
          <Heading as="h1" size="sl" color="white" py={2}>
            Prestamos
          </Heading>
        </Button>

        {user && user.roles && user.roles.includes('admin') && (
          <Button
            gap={2}
            w="full"
            as={Link}
            href="/upload"
            bg="transparent"
            colorScheme="red"
            justifyContent="start"
          >
            <FaComputer size="13px" color="white" />
            <Heading as="h1" size="sl" color="white" py={2}>
              Subir horario
            </Heading>
          </Button>
        )}
      </Box>

      <Box>
        {/* <Button
          gap={2}
          w="full"
          bg="transparent"
          colorScheme="red"
          justifyContent="start"
        >
          <IoIosSettings size="13px" color="white" />
          <Link href="">
            <Heading as="h1" size="sl" color="white" py={2}>
              Ajustes
            </Heading>
          </Link>
        </Button> */}

        {user && (
          <Button
            gap={2}
            w="full"
            onClick={logout}
            bg="transparent"
            colorScheme="red"
            justifyContent="start"
          >
            <RiLogoutBoxLine size="13px" color="white" />
            <Heading as="h1" size="sl" color="white" py={2}>
              Cerrar sesión
            </Heading>
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default DrawerForm
