import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import {
  Box,
  Center,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Skeleton,
  Spinner,
  Stack
} from '@chakra-ui/react'
import COLORS from './Colors.js'
import useLoans from './useLoans.js'
import { useEffect, useState } from 'react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

function LoansGraph () {
  const { loans, isLoading, isRefetching, year, setYear } = useLoans()
  const [valueRadio, setValueRadio] = useState('total')

  useEffect(() => {
    if (valueRadio === 'total') setYear('total')
    else setYear(new Date().getFullYear())
  }, [valueRadio, setYear])

  return (
    <Box w={'full'} bg={'white'} rounded={'md'}>
      {isLoading
        ? (
        <Skeleton height={'250px'} />
          )
        : (
        <Box p={4}>
          <Flex alignItems={'center'} gap={2} mb={2}>
            <RadioGroup onChange={setValueRadio} value={valueRadio}>
              <Stack direction="row">
                <Radio value="total">Total</Radio>
                <Radio value="year">Año</Radio>
              </Stack>
            </RadioGroup>

            {valueRadio === 'year' && (
              <NumberInput
                size={'xs'}
                min={2024}
                value={year}
                maxW={'100px'}
                onChange={(val) => setYear(parseInt(val))}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            )}
          </Flex>

          {isRefetching
            ? (
            <Center minH={'200px'}>
              <Spinner />
            </Center>
              )
            : (
            <Bar
              data={{
                labels: ['Total'],
                datasets: loans?.map((el) => {
                  return {
                    label: el.estado,
                    data: [el.cantidad_prestamos],
                    backgroundColor: COLORS[el.estado]
                  }
                })
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top'
                  },
                  title: {
                    display: true,
                    text: 'Prestamos totales - ' + year
                  }
                }
              }}
            />
              )}
        </Box>
          )}
    </Box>
  )
}

export default LoansGraph
