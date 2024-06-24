import { Button, Stack } from '@chakra-ui/react'

function Rating ({ stars, onRatingChange }) {
  const handleButtonClick = (value) => {
    // console.log(`Button clicked: ${value}`)
    onRatingChange(value)
  }

  return (
    <>
      <Stack direction="row" spacing={4} align="center">
        <Button
          _focus={{
            boxShadow:
              '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)'
          }}
          colorScheme="red"
          borderRadius="100%"
          variant={stars === 1 ? 'solid' : 'outline'}
          onClick={() => handleButtonClick(1)}
        >
          1
        </Button>
        <Button
          colorScheme="red"
          borderRadius="100%"
          variant={stars === 2 ? 'solid' : 'outline'}
          onClick={() => handleButtonClick(2)}
        >
          2
        </Button>
        <Button
          colorScheme="red"
          borderRadius="100%"
          variant={stars === 3 ? 'solid' : 'outline'}
          onClick={() => handleButtonClick(3)}
        >
          3
        </Button>
        <Button
          colorScheme="red"
          borderRadius="100%"
          variant={stars === 4 ? 'solid' : 'outline'}
          onClick={() => handleButtonClick(4)}
        >
          4
        </Button>
      </Stack>
    </>
  )
}

export default Rating
