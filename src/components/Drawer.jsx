import { Box, Button, Divider, Heading } from '@chakra-ui/react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { FaBuilding, FaComputer } from 'react-icons/fa6'
import { GrSchedule } from 'react-icons/gr'
import { IoPersonSharp } from 'react-icons/io5'
import { MdLibraryAdd } from 'react-icons/md'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { TbBuildingArch } from 'react-icons/tb'
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

        <Link href="/home">
          <Button
            gap={2}
            w="full"
            bg="transparent"
            colorScheme="red"
            justifyContent="start"
          >
            <IoPersonSharp size="13px" color="white" />

            <Heading as="h1" size="sl" py={2}>
              Inicio
            </Heading>
          </Button>
        </Link>

        <Link href="/horario">
          <Button
            gap={2}
            w="full"
            bg="transparent"
            colorScheme="red"
            justifyContent="start"
          >
            <GrSchedule size="13px" color="white" />

            <Heading as="h1" size="sl" py={2}>
              Horario
            </Heading>
          </Button>
        </Link>

        <Button
          gap={2}
          w="full"
          as={Link}
          href="/nuevo-prestamo"
          bg="transparent"
          colorScheme="red"
          justifyContent="start"
        >
          <MdLibraryAdd size="13px" color="white" />
          <Heading as="h1" size="sl" color="white" py={2}>
            Pedir prestamo
          </Heading>
        </Button>

        {user && user.roles && user.roles.includes('admin') && (
          <>
            {user && (
              <Divider my={4} borderColor="primary.400" borderWidth={1} />
            )}

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

            <Button
              gap={2}
              w="full"
              as={Link}
              href="/subir-salas"
              bg="transparent"
              colorScheme="red"
              justifyContent="start"
            >
              <FaCloudUploadAlt size="13px" color="white" />
              <Heading as="h1" size="sl" color="white" py={2}>
                Subir salas
              </Heading>
            </Button>

            <Button
              gap={2}
              w="full"
              as={Link}
              href="/subir-horarios"
              bg="transparent"
              colorScheme="red"
              justifyContent="start"
            >
              <FaCloudUploadAlt size="13px" color="white" />
              <Heading as="h1" size="sl" color="white" py={2}>
                Subir horario
              </Heading>
            </Button>

            <Button
              gap={2}
              w="full"
              as={Link}
              href="/edificios"
              bg="transparent"
              colorScheme="red"
              justifyContent="start"
            >
              <FaBuilding size="13px" color="white" />
              <Heading as="h1" size="sl" color="white" py={2}>
                Edificios
              </Heading>
            </Button>

            <Button
              gap={2}
              w="full"
              as={Link}
              href="/salas"
              bg="transparent"
              colorScheme="red"
              justifyContent="start"
            >
              <TbBuildingArch size="13px" color="white" />
              <Heading as="h1" size="sl" color="white" py={2}>
                Salas
              </Heading>
            </Button>
          </>
        )}
      </Box>

      <Box>
        {/* <Link href="">
          <Button
            gap={2}
            w="full"
            bg="transparent"
            colorScheme="red"
            justifyContent="start"
          >
            <IoIosSettings size="13px" color="white" />

            <Heading as="h1" size="sl" color="white" py={2}>
              Ajustes
            </Heading>
          </Button>
        </Link> */}

        {user
          ? (
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
            )
          : (
          <Button
            gap={2}
            w="full"
            as={Link}
            href="/login"
            bg="transparent"
            colorScheme="red"
            justifyContent="start"
          >
            <RiLogoutBoxLine size="13px" color="white" />
            <Heading as="h1" size="sl" color="white" py={2}>
              Inicia sesión
            </Heading>
          </Button>
            )}
      </Box>
    </Box>
  )
}

export default DrawerForm
