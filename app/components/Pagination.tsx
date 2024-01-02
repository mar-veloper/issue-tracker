'use client'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
  count: number
  maxPage: number
  currentPage: number
}

const Pagination = ({ currentPage, count, maxPage }: Props) => {
  const minPage = 1

  const router = useRouter()
  const searchParams = useSearchParams()
  const nextPage = currentPage + 1
  const prevPage = currentPage - 1
  const nextTwoPage = Math.min(currentPage + 2, maxPage)
  const prevTwoPage = Math.max(currentPage - 2, minPage)

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push('?' + params.toString())
  }

  if (maxPage === 0) return null
  return (
    <Flex justify="between" align="center" my="5" gap="5">
      <Text>
        Page {currentPage} of {maxPage}
      </Text>
      <Flex gap="2">
        {' '}
        <Button
          variant="soft"
          onClick={() => changePage(prevTwoPage)}
          disabled={currentPage <= 1}
        >
          <DoubleArrowLeftIcon />
        </Button>
        <Button
          variant="soft"
          onClick={() => changePage(prevPage)}
          disabled={currentPage <= 1}
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          variant="soft"
          onClick={() => changePage(nextPage)}
          disabled={currentPage >= maxPage}
        >
          <ChevronRightIcon />
        </Button>
        <Button
          variant="soft"
          onClick={() => changePage(nextTwoPage)}
          disabled={currentPage >= maxPage}
        >
          <DoubleArrowRightIcon />
        </Button>
      </Flex>
      <Text>Total items: {count}</Text>
    </Flex>
  )
}

export default Pagination
