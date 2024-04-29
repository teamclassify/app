import { Box, Flex, Heading } from '@chakra-ui/react'

import UserAvatar from './UserAvatar'

function Header () {
  return (
    <Box as="header" py={2} mx="auto" w="90%" color='white'>
      <Flex justifyContent="space-between">
        <Heading as="h1" size="md">
          CLASSIFY
        </Heading>
        <UserAvatar />
      </Flex>
    </Box>
  )
}

export default Header
