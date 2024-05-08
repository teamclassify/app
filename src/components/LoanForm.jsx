import {
  Input,
  Button,
  Flex,
  Heading,
  Checkbox,
  Stack,
  Grid,
  GridItem
} from '@chakra-ui/react'

import { useState } from 'react'
import SelectBuildings from '../pages/rooms/SelectBuildings'
import SelectRooms from '../pages/rooms/SelectRooms'
import Schedule from './Schedule'

function MyLoans () {
  const [currentBuilding, setCurrentBuilding] = useState(null)
  const [currentRoom, setCurrentRoom] = useState(null)

  return (
    <>
      <Grid
        templateAreas={`"nav main"
                  "nav main"`}
        gridTemplateRows={'1fr'}
        gridTemplateColumns={'0.7fr'}
        gap="4"
        color="blackAlpha.700"
        fontWeight="bold"
        mx={7}
      >
        <GridItem pl="2" area={'nav'} bg={'white'} p={2} rounded={5}>
          <Schedule roomId={currentRoom} />
        </GridItem>

        <GridItem pl="2" area={'main'} bg={'white'} p={2} rounded={5}>
          <Flex flexDirection="column" gap={4}>
            <Flex flexDirection={'column'} gap={2}>
              <Heading fontSize="1.2rem" fontFamily="sans-serif">
                Edificio
              </Heading>
              <SelectBuildings
                size="sm"
                currentBuilding={currentBuilding}
                setCurrentBuilding={setCurrentBuilding}
              />
            </Flex>
            <Flex flexDirection="column" gap={4}>
              <Flex flexDirection={'column'} gap={2}>
                <Heading fontSize="1.2rem" fontFamily="sans-serif">
                  Sala
                </Heading>
                <SelectRooms
                  size="sm"
                  currentRoom={currentRoom}
                  building={currentBuilding}
                  handleChange={setCurrentRoom}
                />
              </Flex>
              <Flex flexDirection={'column'} gap={2}>
              <Heading fontSize="1.2rem" fontFamily="sans-serif">
                  Personas
                </Heading>
              <Input placeholder='¿Cuantas personas asistiran?' />
              </Flex>
              <Flex flexDirection={'column'} gap={2}>
                <Heading fontSize="1.2rem" fontFamily="sans-serif">
                  Recursos
                </Heading>
                <Stack spacing={5} direction="row">
                  <Checkbox colorScheme="green" defaultChecked>
                    Videobeam
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Marcador
                  </Checkbox>
                </Stack>
              </Flex>
            </Flex>
          </Flex>
        </GridItem>
      </Grid>

      <Button mx={7} my={5} colorScheme="blue" width="10%">
        Confirmar
      </Button>
    </>
  )
}

export default MyLoans
