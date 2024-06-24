import { Stack, Badge } from '@chakra-ui/react'

function UploadExcelMessage () {
  return (
    <>
      <Stack direction="row" justify="center" m={2}>
        <Badge variant="subtle" colorScheme="green">
          Por favor, sube un archivo en formato Excel (.xls, .xlsx)
        </Badge>
      </Stack>
    </>
  )
}

export default UploadExcelMessage
