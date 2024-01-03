'use client'
import {
  IssueQuery,
  IssueSortBy,
  IssueSortOrder,
} from '@/app/types/issue.types'
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons'
import { Flex, Table } from '@radix-ui/themes'
import NextLink from 'next/link'
import { useIssueContext } from '../../list/IssueContext'

interface Props {
  searchParams: IssueQuery
}

const IssueTableHeader = ({ searchParams }: Props) => {
  const {
    toggleSortOrder,
    sortBy: currentSortBy,
    sortOrder,
  } = useIssueContext()

  const renderArrowIcon = () =>
    sortOrder === IssueSortOrder.asc ? <ArrowUpIcon /> : <ArrowDownIcon />

  return (
    <Table.Header>
      <Table.Row>
        {columns.map((column, index) => {
          const isSortActive = currentSortBy === column.value

          return (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NextLink
                href={{
                  query: {
                    ...searchParams,
                    sortBy: column.value,
                    sortOrder: toggleSortOrder(),
                  },
                }}
              >
                <Flex
                  gap="1"
                  align="center"
                  className="!last:justify-items-end"
                  justify={index === columns.length - 1 ? 'end' : 'start'}
                >
                  {column.label}

                  {isSortActive && renderArrowIcon()}
                </Flex>
              </NextLink>
            </Table.ColumnHeaderCell>
          )
        })}
      </Table.Row>
    </Table.Header>
  )
}

export default IssueTableHeader

interface Column {
  label: string
  value: IssueSortBy
  className?: string
}

const columns: Column[] = [
  {
    label: 'Issue',
    value: IssueSortBy.title,
  },
  {
    label: 'Status',
    value: IssueSortBy.status,
    className: 'hidden md:table-cell',
  },
  {
    label: 'Created',
    value: IssueSortBy.createdAt,
    className: 'hidden md:table-cell text-right',
  },
]
