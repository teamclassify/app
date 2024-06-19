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
import { Box, Skeleton } from '@chakra-ui/react'
import COLORS from './Colors.js'
import useLoans from './useLoans.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

function LoansGraph () {
  const { loans, isLoading } = useLoans()

  return (
    <Box w={'full'} bg={'white'} rounded={'md'}>
      {isLoading
        ? (
        <Skeleton height={'250px'} />
          )
        : (
        <Box p={4}>
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
                  text: 'Prestamos totales'
                }
              }
            }}
          />
        </Box>
          )}
    </Box>
  )
}

export default LoansGraph
