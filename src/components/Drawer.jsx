import {
  Box, Heading, Button, Image
} from '@chakra-ui/react'

import { IoPersonSharp } from 'react-icons/io5'
import { GrSchedule } from 'react-icons/gr'
import { MdDashboard } from 'react-icons/md'
import { FaComputer } from 'react-icons/fa6'
import { IoIosSettings } from 'react-icons/io'
import { RiLogoutBoxLine } from 'react-icons/ri'

function DrawerForm () {
  return (
    <>
      <Box p={8}display='flex' flexDirection='column' bg="rgb(196 38 38)" minH="100vh" justifyContent='space-between' alignItems='start'>
        <Box>
          <Image></Image>
          <Button colorScheme='red' bg='transparent' gap={2}><IoPersonSharp size='13px'color='white' /><Heading as='h1' size='sl' py={2}>INICIO</Heading></Button>
          <Button colorScheme='red' bg='transparent' gap={2}><GrSchedule size='13px'color='white' /><a href=''> <Heading as='h1' size='sl' color='white' py={2}>HORARIO</Heading></a></Button>
          <Button colorScheme='red' bg='transparent' gap={2}><MdDashboard size='13px'color='white' /><a href=''><Heading as='h1' size='sl' color='white' py={2}>DASHBOARD</Heading></a></Button>
          <Button colorScheme='red' bg='transparent' gap={2}><FaComputer size='13px'color='white' /><a href=''><Heading as='h1' size='sl' color='white' py={2}>PRESTAMOS</Heading></a></Button>
         </Box>
         <Box>
         <Button colorScheme='red' bg='transparent' gap={2}><IoIosSettings size='13px'color='white' /><a href=''><Heading as='h1' size='sl' color='white' py={2}>AJUSTES</Heading></a></Button>
         <Button colorScheme='red' bg='transparent' gap={2}><RiLogoutBoxLine size='13px'color='white' /><a href=''><Heading as='h1' size='sl' color='white' py={2}>LOGOUT</Heading></a></Button>
         </Box>
      </Box>
    </>
  )
}

export default DrawerForm
