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

import FilterRadio from '../../components/FilterRadio.jsx'

const STATE_OPTIONS = ['TODOS', 'ACTIVO', 'INACTIVO']

function Filters ({
  filterState,
  filterRol,
  setFilterRol,
  setFilterName,
  setFilterState
}) {
  const [searchValue, setSearchValue] = useState('')

  const handleChangeSearchInput = (e) => {
    setSearchValue(e.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setFilterName(searchValue)
  }

  const handleClean = () => {
    setFilterName('')
    setSearchValue('')
    setFilterRol('')
    setFilterState('')
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

      <FilterRadio
        size="sm"
        title="Estado"
        defaultValue="TODOS"
        value={filterState}
        options={STATE_OPTIONS}
        setValue={setFilterState}
      />

      <FilterRadio
        size="sm"
        title={'Rol'}
        value={filterRol}
        setValue={setFilterRol}
        options={['usuario', 'admin', 'soporte_tecnico']}
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
