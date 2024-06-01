import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'
import { useState } from 'react'
import { IoSearch } from 'react-icons/io5'

import FilterSelect from '@/components/FilterSelect'

function Filters ({ setFilterState, setFilterReason }) {
  const [searchValue, setSearchValue] = useState('')

  const handleChangeSearchInput = (e) => {
    setSearchValue(e.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setFilterReason(searchValue)
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
              type='submit'
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
        options={[
          'PENDIENTE',
          'PREAPROBADO',
          'APROBADO',
          'CANCELADO',
          'REALIZADO'
        ]}
        onCheck={setFilterState}
      />
    </Flex>
  )
}

export default Filters
