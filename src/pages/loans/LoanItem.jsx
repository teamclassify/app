import { Badge, Box, Flex, Heading, Text } from '@chakra-ui/react'
import { MdOutlineRateReview } from 'react-icons/md'

function LoanItem ({ state, date, loanroom, building, reason }) {
  return (
    <Box rounded="md" p={2} bg="white">
      <Flex gap={4} alignItems="start">
        <MdOutlineRateReview size={24} />

        <Box>
          <Flex gap={2}>
            <Heading size="sm">
              {building} - {loanroom}
            </Heading>

            <Badge size="sm">{state}</Badge>
          </Flex>

          <Text fontSize="sm">{date}</Text>
          <Text fontSize="sm" color='gray.500'>{reason}</Text>
        </Box>
      </Flex>
    </Box>
  )
}

export default LoanItem
