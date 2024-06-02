import { HamburgerIcon } from '@chakra-ui/icons'
import { Box, Button, Divider, Heading } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
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
  const refWrapper = useRef()
  const refButton = useRef()

  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    function clickOutWrapper (event) {
      if (
        refWrapper &&
        !refWrapper.current.contains(event.target) &&
        refButton &&
        !refButton.current.contains(event.target)
      ) {
        setIsVisible(false)
      }
    }

    document.addEventListener('click', clickOutWrapper)

    return () => {
      removeEventListener('click', clickOutWrapper)
    }
  }, [])

  return (
    <>
      <Button
        top={2}
        right={4}
        position="fixed"
        iconSpacing={0}
        ref={refButton}
        colorScheme="primary"
        leftIcon={<HamburgerIcon />}
        onClick={() => setIsVisible((prev) => !prev)}
        visibility={{ base: 'visible', md: 'hidden' }}
      />

      <Box
        p={4}
        zIndex={9}
        maxW="250px"
        minH="100vh"
        display="flex"
        position="fixed"
        ref={refWrapper}
        bg="rgb(196 38 38)"
        alignItems="start"
        transition="all 400ms"
        flexDirection="column"
        justifyContent="space-between"
        left={{ base: isVisible ? '0' : '-250px', md: '0' }}
        visibility={{ base: isVisible ? 'visible' : 'hidden', md: 'visible' }}
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
              Pedir préstamo
            </Heading>
          </Button>

          {user &&
            (user.roles.includes('superadmin') ||
              user.roles.includes('admin')) && (
              <Divider my={4} borderColor="primary.400" borderWidth={1} />
          )}

          {user && user.roles && user.roles.includes('superadmin') && (
            <>
              <Button
                gap={2}
                w="full"
                as={Link}
                href="/usuarios"
                bg="transparent"
                colorScheme="red"
                justifyContent="start"
              >
                <TbBuildingArch size="13px" color="white" />
                <Heading as="h1" size="sl" color="white" py={2}>
                  Usuarios
                </Heading>
              </Button>
            </>
          )}

          {user && user.roles && user.roles.includes('admin') && (
            <>
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
                  Préstamos
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

        <Box w='full'>
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
              w="full"
              onClick={logout}
              bg="transparent"
              colorScheme="red"
              justifyContent="start"
              leftIcon={<RiLogoutBoxLine />}
            >
              Cerrar sesión
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
    </>
  )
}

export default DrawerForm
