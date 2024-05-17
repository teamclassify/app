import { Badge, Box, Flex, Heading, Text } from '@chakra-ui/react'
import { BsPeople } from 'react-icons/bs'
import { MdOutlineRateReview } from 'react-icons/md'

function LoanItem ({
  state,
  date,
  loanroom,
  building,
  reason,
  people,
  resources
}) {
  return (
    <Box rounded="md" p={2} bg="white">
      <Flex gap={4} alignItems="start">
        <MdOutlineRateReview size={24} />

        <Box>
          <Flex gap={2}>
            <Heading size="sm">
              {building} - {loanroom}
            </Heading>

            <Badge
              size="sm"
              colorScheme={state === 'PENDIENTE' ? 'yellow' : 'gray'}
            >
              {state}
            </Badge>
          </Flex>

          <Text fontSize="xs">{date}</Text>
          <Text fontSize="sm" color="gray.500" my={2}>
            Razón: {reason}
          </Text>

          <Flex alignItems="center" gap={2} mb={2}>
            <BsPeople />
            <Text fontSize="sm">{people}</Text>
          </Flex>

          <Flex alignItems="center" gap={2}>
            {resources &&
              resources.split(',').map((resource) => (
                <Badge key={resource.id} fontSize="xs" colorScheme='blue'>
                  {resource}
                </Badge>
              ))}
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export default LoanItem
