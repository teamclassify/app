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
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import StatsService from '../../services/api/StatsService.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

function FeedbackGraph () {
  const [data, setData] = useState([])
  const [year, setYear] = useState(2024)
  const [valueRadio, setValueRadio] = useState('total')

  const { isLoading, isRefetching } = useQuery(
    ['stats', 'feedback', year],
    () => {
      return StatsService.getFeedback(year)
    },
    {
      onSuccess: (data) => {
        if (!data.success) return

        const d = {}
        data?.data?.forEach((feedback) => {
          const valoracion = feedback.valoracion

          if (!d[valoracion]) {
            d[valoracion] = [feedback.valoracion_count]
          }
        })

        setData([
          {
            label: '1',
            data: d['1'],
            backgroundColor: '#C53030'
          },
          {
            label: '2',
            data: d['2'],
            backgroundColor: '#ECC94B'
          },
          {
            label: '3',
            data: d['3'],
            backgroundColor: '#68D391'
          },
          {
            label: '4',
            data: d['4'],
            backgroundColor: '#22543D'
          }
        ])
      }
    }
  )

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
                labels: ['total'],
                datasets: data
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top'
                  },
                  title: {
                    display: true,
                    text: 'Satisfacción de los usuarios - ' + year
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

export default FeedbackGraph
