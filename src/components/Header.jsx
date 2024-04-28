import { Box, Flex, Heading } from '@chakra-ui/react'

import UserAvatar from './UserAvatar'

function Header () {
  return (
    <Box as="header" px={8} py={2}>
      <Flex justifyContent='space-between'>
        <Heading as='h1' size='md'>App</Heading>

        <UserAvatar />
      </Flex>
    </Box>
  )
}

export default Header
