import { Avatar, Box, Flex, Heading, Spinner } from '@chakra-ui/react'

import useUser from '../hooks/useUser'

function UserAvatar () {
  const { user, loading } = useUser()

  return (
    <>
      {loading
        ? (
        <Spinner />
          )
        : (
        <Box w='full' px={2}>
          {user && (
            <>
              <Flex gap={2} alignItems='center'>
                <Avatar src={user.photo} size="md" />
                <Heading
                  as="h1"
                  color="white"
                  fontSize="sm"
                  textAlign="center"
                >
                  {user.name}
                </Heading>
              </Flex>
            </>
          )}
        </Box>
          )}
    </>
  )
}

export default UserAvatar
