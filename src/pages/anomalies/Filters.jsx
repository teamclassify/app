import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'
import { useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { MdOutlineCleaningServices } from 'react-icons/md'

import FilterSelect from '@/components/FilterSelect'

const STATE_OPTIONS = ['PENDIENTE', 'SOLUCIONADO']

function Filters ({ setFilterState, setFilterDescription }) {
  const [checkedItems, setCheckedItems] = useState(
    STATE_OPTIONS.map((option) => {
      return {
        value: option,
        checked: false
      }
    })
  )
  const [searchValue, setSearchValue] = useState('')

  const handleChangeSearchInput = (e) => {
    setSearchValue(e.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setFilterDescription(searchValue)
  }

  const handleClean = () => {
    setCheckedItems((prev) => {
      return prev.map((el) => {
        return {
          value: el.value,
          checked: false
        }
      })
    })

    setFilterState((prev) => {
      return prev.map((el) => {
        return {
          value: el.value,
          checked: false
        }
      })
    })

    setFilterDescription('')
    setSearchValue('')
  }

  return (
    <Flex p={2} gap={2} bg={'white'} mb={4} rounded={'md'}>
      <form onSubmit={handleSearch}>
        <InputGroup size="sm" maxW="xs">
          <Input
            type="text"
            rounded={'md'}
            placeholder="Buscar ..."
            value={searchValue}
            onChange={handleChangeSearchInput}
          />

          <InputRightElement>
            <Button
              type="submit"
              size="sm"
              iconSpacing={0}
              colorScheme="blue"
              borderLeftRadius={0}
              leftIcon={<IoSearch />}
            />
          </InputRightElement>
        </InputGroup>
      </form>

      <FilterSelect
        size="sm"
        title="Estado"
        options={STATE_OPTIONS}
        onCheck={setFilterState}
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
      />

      <Button
        size="sm"
        iconSpacing={0}
        onClick={handleClean}
        leftIcon={<MdOutlineCleaningServices />}
      />
    </Flex>
  )
}

export default Filters
