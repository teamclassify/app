import {
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
  Textarea,
  VStack
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaBuilding } from 'react-icons/fa'

import SelectBuildings from '../pages/rooms/SelectBuildings'
import SelectRooms from '../pages/rooms/SelectRooms'
import Schedule from './Schedule'

function MyLoans () {
  const [currentBuilding, setCurrentBuilding] = useState(null)
  const [currentRoom, setCurrentRoom] = useState(null)

  return (
    <>
      <Grid
        minH="calc(100vh - 110px)"
        gap="4"
        fontWeight="bold"
        color="blackAlpha.700"
        gridTemplateColumns={{ base: '1fr', md: '1.5fr 1fr' }}
      >
        <GridItem bg={'white'} p={2} rounded={5}>
          {!currentBuilding
            ? (
            <Center h="100%" flexDir="column">
              <FaBuilding size={100} />
              <Text mt={4}>Selecciona un edificio para ver sus salas</Text>
            </Center>
              )
            : (
            <>
              {!currentRoom
                ? (
                <Center h="100%" flexDir="column">
                  <FaBuilding size={100} />
                  <Text mt={4}>
                    Selecciona una sala para ver su disponibilidad
                  </Text>
                </Center>
                  )
                : (
                <Schedule roomId={currentRoom} isClickable />
                  )}
            </>
              )}
        </GridItem>

        <GridItem
          maxH="calc(100vh - 110px)"
          bg={'white'}
          p={4}
          rounded={5}
          overflowY="auto"
        >
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Edificio</FormLabel>
              <SelectBuildings
                currentBuilding={currentBuilding}
                setCurrentBuilding={setCurrentBuilding}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Sala</FormLabel>
              <SelectRooms
                currentRoom={currentRoom}
                building={currentBuilding}
                handleChange={setCurrentRoom}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Personas</FormLabel>

              <NumberInput>
                <NumberInputField placeholder="¿Cuantas personas asistiran?" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl>
              <FormLabel>Recursos</FormLabel>

              <Stack spacing={5} direction="row">
                <Checkbox colorScheme="green">Videobeam</Checkbox>

                <Checkbox colorScheme="green">Marcador</Checkbox>
              </Stack>
            </FormControl>

            <FormControl>
              <FormLabel>Razón de el préstamo</FormLabel>
              <Textarea placeholder="..." />
            </FormControl>
          </VStack>
        </GridItem>
      </Grid>

      <Flex mt={4} justifyContent="end">
        <Button colorScheme="primary">Confirmar</Button>
      </Flex>
    </>
  )
}

export default MyLoans
