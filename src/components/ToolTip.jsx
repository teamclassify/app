import { BiSolidInfoCircle } from 'react-icons/bi'
import { Tooltip, Button } from '@chakra-ui/react'

function ToolTipo ({ State }) {
  /* const label = State === 1 ? 'Prestamo aprobado' : State === 0 ? 'Prestamo en espera' : 'Prestamo rechazado' */

  return (
    <>
      <Tooltip hasArrow>
        <Button
          bg="transparent"
          _hover="none"
          variant='unstyled'
          p={0}
          leftIcon={<BiSolidInfoCircle size="2rem" color="white" />}
          iconSpacing={0}
        />
      </Tooltip>
    </>
  )
}

export default ToolTipo
