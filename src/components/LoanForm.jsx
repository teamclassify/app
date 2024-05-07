import {
  Box,
  Button,
  Flex,
  Heading,
  Select,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Checkbox,
  Stack
} from '@chakra-ui/react'

function MyLoans () {
  return (
    <>
      <Box display="flex" flexDirection="column" mt="2rem">
        <Box
          display="flex"
          alignContent="center"
          alignItems="center"
          justifyContent="start"
        >
          <Heading fontSize="1.2rem" fontFamily="sans-serif">
            Prestamos
          </Heading>
        </Box>
        <Flex flexDirection="column" minH="50vh" justifyContent="space-evenly">
          <Flex flexDirection="row">
            <FormControl>
              <FormLabel>Sala</FormLabel>
              <Select placeholder="Selecciona una sala">
                <option>SA 404</option>
                <option>SA 414</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Computadores</FormLabel>
              <NumberInput max={50} min={10}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Personas</FormLabel>
              <NumberInput max={50} min={10}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </Flex>
          <Flex flexDirection="row">
            <FormControl>
              <FormLabel>Fecha</FormLabel>
              <Select placeholder="Seleccione una fecha">
                <option>SA 404</option>
                <option>SA 414</option>
              </Select>
            </FormControl>
          </Flex>
          <Heading fontSize="1.2rem" fontFamily="sans-serif">
            Recursos
          </Heading>
          <Flex>
            <Stack spacing={5} direction="row">
              <Checkbox colorScheme="green" defaultChecked>
                Videobeam
              </Checkbox>
              <Checkbox colorScheme="green" defaultChecked>
                Marcador
              </Checkbox>
            </Stack>
          </Flex>
          <Button colorScheme='blue' width='10%'>Confirmar</Button>
        </Flex>
      </Box>
    </>
  )
}

export default MyLoans
