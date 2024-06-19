import { useState } from 'react'
import { useQuery } from 'react-query'
import StatsService from '../../services/api/StatsService.js'
import { Box, Icon, Skeleton, Text } from '@chakra-ui/react'
import { FaBuilding, FaCheckCircle } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'

function LoansIndicators () {
  const [loans, setLoans] = useState([])

  const { isLoading, isRefetching } = useQuery(
    ['stats', 'loans-total', 'total'],
    () => {
      return StatsService.getAllLoans('total')
    },
    {
      onSuccess: (data) => {
        if (!data.success) return

        setLoans(data?.data)
      }
    }
  )

  return (
    <>
      {isLoading || isRefetching
        ? (
        <>
          <Skeleton height={'160px'} />
          <Skeleton height={'160px'} />
          <Skeleton height={'160px'} />
        </>
          )
        : (
        <>
          <Box bg={'yellow.400'} p={4} rounded={'md'} color={'white'}>
            <Icon as={FaBuilding} fontSize={'xx-large'} mb={2} />
            <Text fontSize={'lg'} fontWeight={'bold'}>
              Prestamos solicitados
            </Text>
            <Text fontSize={'xx-large'} fontWeight={'bold'}>
              {loans?.reduce((acc, cur) => acc + cur.cantidad_prestamos, 0)}
            </Text>
          </Box>

          <Box bg={'green.500'} p={4} rounded={'md'} color={'white'}>
            <Icon as={FaCheckCircle} fontSize={'xx-large'} mb={2} />
            <Text fontSize={'lg'} fontWeight={'bold'}>
              Prestamos aceptados
            </Text>
            <Text fontSize={'xx-large'} fontWeight={'bold'}>
              {
                loans?.find((loan) => loan.estado === 'APROBADO')
                  ?.cantidad_prestamos
              }
            </Text>
          </Box>

          <Box bg={'red.500'} p={4} rounded={'md'} color={'white'}>
            <Icon as={MdCancel} fontSize={'xx-large'} mb={2} />
            <Text fontSize={'lg'} fontWeight={'bold'}>
              Prestamos cancelados
            </Text>
            <Text fontSize={'xx-large'} fontWeight={'bold'}>
              {
                loans?.find((loan) => loan.estado === 'CANCELADO')
                  ?.cantidad_prestamos
              }
            </Text>
          </Box>
        </>
          )}
    </>
  )
}

export default LoansIndicators
