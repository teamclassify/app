import {
  Box,
  Button,
  Heading
} from '@chakra-ui/react'

import { FaComputer } from 'react-icons/fa6'
import { GrSchedule } from 'react-icons/gr'
import { IoIosSettings } from 'react-icons/io'
import { IoPersonSharp } from 'react-icons/io5'
import { MdDashboard } from 'react-icons/md'
import { RiLogoutBoxLine } from 'react-icons/ri'
import UserPic from './UserPic'

import useUser from '../hooks/useUser'
import { Link } from 'wouter'

function DrawerForm () {
  const { logout } = useUser()

  return (
    <>
      <Box p={8} pt={16} display='flex' flexDirection='column' bg="rgb(196 38 38)" minH="100vh" justifyContent='space-between' alignItems='start'>
        <Box>
          <Box display='flex'justifyContent='center' pb={10}>
            <UserPic/>
            </Box>
          <Button colorScheme='red' bg='transparent' gap={2}><IoPersonSharp size='13px'color='white' /><Link href='/home'><Heading as='h1' size='sl' py={2}>Inicio</Heading></Link></Button>
          <Button colorScheme='red' bg='transparent' gap={2}><GrSchedule size='13px'color='white' /><Link href=''> <Heading as='h1' size='sl' color='white' py={2}>Horario</Heading></Link></Button>
          <Button colorScheme='red' bg='transparent' gap={2}><MdDashboard size='13px'color='white' /><Link href=''><Heading as='h1' size='sl' color='white' py={2}>Dashboard</Heading></Link></Button>
          <Button colorScheme='red' bg='transparent' gap={2}><FaComputer size='13px'color='white' /><Link href='/prestamos'><Heading as='h1' size='sl' color='white' py={2}>Prestamos</Heading></Link></Button>
         </Box>
         <Box>
         <Button colorScheme='red' bg='transparent' gap={2}><IoIosSettings size='13px'color='white' /><Link href=''><Heading as='h1' size='sl' color='white' py={2}>Ajustes</Heading></Link></Button>
         <Button onClick={logout} colorScheme='red' bg='transparent' gap={2}><RiLogoutBoxLine size='13px'color='white' /><Heading as='h1' size='sl' color='white' py={2}>Logout</Heading></Button>
         </Box>
      </Box>
    </>
  )
}

export default DrawerForm
