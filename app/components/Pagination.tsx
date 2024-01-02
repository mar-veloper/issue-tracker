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
  currentPage: number
  maxPage: number
  queryName?: string
}

const Pagination = ({
  currentPage,
  count,
  maxPage: lastPage,
  queryName = 'page',
}: Props) => {
  const firstPage = 1

  const router = useRouter()
  const searchParams = useSearchParams()
  const nextPage = currentPage + 1
  const prevPage = currentPage - 1

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set(queryName, page.toString())
    router.push('?' + params.toString())
  }

  if (lastPage === 0) return null
  return (
    <Flex justify="between" align="center" my="5" gap="5">
      <Text>
        Page {currentPage} of {lastPage}
      </Text>
      <Flex gap="2">
        <Flex gap="2" className="">
          <Button
            variant="soft"
            onClick={() => changePage(firstPage)}
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
        </Flex>
        <Flex gap="2" className="">
          <Button
            variant="soft"
            onClick={() => changePage(nextPage)}
            disabled={currentPage >= lastPage}
          >
            <ChevronRightIcon />
          </Button>
          <Button
            variant="soft"
            onClick={() => changePage(lastPage)}
            disabled={currentPage >= lastPage}
          >
            <DoubleArrowRightIcon />
          </Button>
        </Flex>
      </Flex>
      <Text className="hidden md:block">Total items: {count}</Text>
    </Flex>
  )
}

export default Pagination
