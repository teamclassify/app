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

  const handleSearch = () => {
    setFilterReason(searchValue)
  }

  return (
    <Flex p={2} gap={2} bg={'white'} mb={4} rounded={'md'}>
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
            size="sm"
            iconSpacing={0}
            colorScheme="blue"
            borderLeftRadius={0}
            onClick={handleSearch}
            leftIcon={<IoSearch />}
          />
        </InputRightElement>
      </InputGroup>

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
