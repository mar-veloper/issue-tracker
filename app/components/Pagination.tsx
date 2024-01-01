import { Flex, Text } from '@radix-ui/themes'
import React from 'react'

interface Props {
  itemCount: number
  pageSize: number
  currentPage: number
}

const Pagination = ({ currentPage, itemCount, pageSize }: Props) => {
    
  return (
    <Flex>
      <Text>Page {currentPage}</Text>

    </Flex>
  )
}

export default Pagination
