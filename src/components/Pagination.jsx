import { Box, Flex, Button } from '@chakra-ui/react'
import { PAGINATION_LIMIT } from '../config/index.js'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

const Pagination = ({ totalItems, currentPage, onChangePage }) => {
  const pageCount = Math.ceil(totalItems / PAGINATION_LIMIT)

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pageCount) {
      return
    }
    onChangePage(newPage)
  }

  return (
    <Flex
      p={2}
      mt={4}
      rounded={'md'}
      alignItems="center"
      justifyContent="center"
    >
      <Box>
        <Button
          size={'sm'}
          variant="ghost"
          iconSpacing={0}
          isDisabled={currentPage === 1}
          leftIcon={<FaAngleLeft />}
          onClick={() => handlePageChange(currentPage - 1)}
        />
      </Box>

      <Flex>
        {Array.from({ length: pageCount }).map((_, index) => {
          const page = index + 1
          return (
            <Box key={page} mx={1}>
              <Button
                size={'sm'}
                variant={'ghost'}
                colorScheme={'green'}
                onClick={() => handlePageChange(page)}
                isActive={currentPage === page}
              >
                {page}
              </Button>
            </Box>
          )
        })}
      </Flex>

      <Box>
        <Button
          size={'sm'}
          variant="ghost"
          iconSpacing={0}
          isDisabled={currentPage === pageCount}
          leftIcon={<FaAngleRight />}
          onClick={() => handlePageChange(currentPage + 1)}
        />
      </Box>
    </Flex>
  )
}

export default Pagination
