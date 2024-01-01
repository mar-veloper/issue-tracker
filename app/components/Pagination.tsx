import { Flex, Text } from '@radix-ui/themes'
import React from 'react'

interface Props {
  count: number
  maxPage: number
  currentPage: number
}

const Pagination = ({ currentPage, count, maxPage }: Props) => {
  return (
    <Flex>
      <Text>
        Page {currentPage} of {maxPage}. Total items: {count}
      </Text>
    </Flex>
  )
}

export default Pagination
