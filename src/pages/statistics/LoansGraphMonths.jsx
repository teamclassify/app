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
import { useState } from 'react'
import {
  Box,
  Center,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Skeleton,
  Spinner
} from '@chakra-ui/react'
import { useQuery } from 'react-query'
import StatsService from '@/services/api/StatsService'
import COLORS from './Colors.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

function LoansGraphMonths () {
  const [labels, setLabels] = useState([])
  const [data, setData] = useState([])
  const [year, setYear] = useState(new Date().getFullYear())

  const { isLoading, isRefetching } = useQuery(
    ['stats', 'loans-months', year],
    () => {
      return StatsService.getLoansByMonths(year)
    },
    {
      onSuccess: (data) => {
        if (!data.success) return

        const d = {}
        data?.data?.forEach((p) => {
          const estado = p.estado

          if (!d[estado]) {
            d[estado] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }

          d[estado][p.mes - 1] = p.cantidad_prestamos
        })

        setLabels([
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre'
        ])

        setData([
          {
            label: 'APROBADO',
            data: d.APROBADO,
            backgroundColor: COLORS.APROBADO
          },
          {
            label: 'CANCELADO',
            data: d.CANCELADO,
            backgroundColor: COLORS.CANCELADO
          }
        ])
      }
    }
  )

  return (
    <Box w={'full'} bg={'white'} rounded={'md'}>
      {isLoading
        ? (
        <Skeleton height={'250px'} />
          )
        : (
        <Box p={4}>
          <Flex justifyContent={'end'}>
            <NumberInput
              size={'sm'}
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
                labels,
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
                    text: 'Prestamos mensuales del ' + year
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

export default LoansGraphMonths
