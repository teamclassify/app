import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger
} from '@chakra-ui/react'
import { FaAngleDown } from 'react-icons/fa'

function FilterSelect (
  { title, size, options, onCheck, checkedItems, setCheckedItems } = {
    size: 'md',
    options: []
  }
) {
  const handleCheck = (index, value, isChecked) => {
    setCheckedItems((prev) => {
      const newValues = [...prev]
      newValues[index] = { value, checked: isChecked }
      onCheck(newValues)
      return newValues
    })
  }

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
              {options.map((option, index) => {
                return (
                  <Checkbox
                    key={index}
                    value={option}
                    isChecked={checkedItems[index]?.checked ?? false}
                    onChange={(e) =>
                      handleCheck(index, option, e.target.checked)
                    }
                  >
                    {option}
                  </Checkbox>
                )
              })}
            </FormControl>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  )
}

export default FilterSelect
