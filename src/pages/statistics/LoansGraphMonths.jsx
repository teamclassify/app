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
import { Box, Skeleton } from '@chakra-ui/react'
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

  const { isLoading } = useQuery(
    ['stats', 'loans-months'],
    () => {
      return StatsService.getLoansByMonths()
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

  console.log(labels)
  console.log(data)

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
                  text: 'Prestamos mensuales'
                }
              }
            }}
          />
        </Box>
          )}
    </Box>
  )
}

export default LoansGraphMonths
