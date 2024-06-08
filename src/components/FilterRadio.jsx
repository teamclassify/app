import {
  Box,
  Button,
  FormControl,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Stack
} from '@chakra-ui/react'
import { FaAngleDown } from 'react-icons/fa'

function FilterRadio (
  { title, size, options, value, setValue, defaultValue } = {
    size: 'md',
    options: [],
    defaultValue: ''
  }
) {
  return (
    <Box>
      <Popover placement="bottom-start">
        <PopoverTrigger>
          <Button size={size} rightIcon={<FaAngleDown />} colorScheme="gray">
            {title}
          </Button>
        </PopoverTrigger>

        <PopoverContent maxW="170px">
          <PopoverBody>
            <FormControl>
              <RadioGroup onChange={setValue} value={value || defaultValue}>
                <Stack direction="column">
                  {options?.map((option, index) => {
                    return (
                      <Radio key={index} value={option}>
                        {option.replaceAll('_', ' ')}
                      </Radio>
                    )
                  })}
                </Stack>
              </RadioGroup>
            </FormControl>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  )
}

export default FilterRadio
