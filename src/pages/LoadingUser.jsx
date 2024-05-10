import { Box, Spinner, Stack, Text } from '@chakra-ui/react'

function LoadingUser () {
  return (
    <Box
      position="absolute"
      height="100%"
      width="100%"
      display="flex"
      flexDirection="column"
    >
      <Stack
        height="100%"
        width="100%"
        display="flex"
        alignItems="center"
        justify="center"
        spacing="4"
      >
        <Box
          display="flex"
          height="100%"
          width="100%"
          textAlign="center"
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          <Box>
            <Spinner size="xl" mb={4} />

            <Text fontSize="md" color="gray.700" fontWeight="bold">
              Cargando usuario
            </Text>
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}

export default LoadingUser
