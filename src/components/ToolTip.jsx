import { BiSolidInfoCircle } from 'react-icons/bi'
import { Tooltip, Button } from '@chakra-ui/react'

function ToolTipo ({ State }) {
  const label =
    State === 'APROBADO'
      ? 'Préstamo aprobado'
      : State === 'PENDIENTE'
        ? 'Préstamo en espera'
        : 'Préstamo rechazado'

  return (
    <>
      <Tooltip hasArrow label={label}>
        <Button
          bg="transparent"
          _hover="none"
          variant="unstyled"
          p={0}
          leftIcon={<BiSolidInfoCircle size="1.5rem" color="white" />}
          iconSpacing={0}
        />
      </Tooltip>
    </>
  )
}

export default ToolTipo
