'use client'
import { IssueStatusBadge } from '@/app/components'
import routes from '@/app/routes'
import {
  IssueQuery,
  IssueSortBy,
  IssueSortOrder,
} from '@/app/types/issue.types'
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons'
import { Flex, Table } from '@radix-ui/themes'
import { default as Link, default as NextLink } from 'next/link'
import { useIssueContext } from '../list/IssueContext'
import moment from 'moment'

interface Column {
  label: string
  value: IssueSortBy
  className?: string
}

interface Props {
  searchParams: IssueQuery
}

const IssueTable = ({ searchParams }: Props) => {
  const {
    issues,
    toggleSortOrder,
    sortBy: currentSortBy,
    sortOrder,
    isLoading,
    error,
  } = useIssueContext()

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
      className: 'hidden md:table-cell',
    },
  ]

  const renderArrowIcon = () =>
    sortOrder === IssueSortOrder.asc ? <ArrowUpIcon /> : <ArrowDownIcon />

  if (isLoading) return <div>Loading...</div>
  if (error) return null

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => {
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
                  <Flex gap="1" align="center">
                    {column.label}

                    {isSortActive && renderArrowIcon()}
                  </Flex>
                </NextLink>
              </Table.ColumnHeaderCell>
            )
          })}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`${routes.ISSUES.MAIN}/${issue.id}`}>
                {issue.title}
              </Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {moment(issue.createdAt).format('MMM DD, YYYY')}{' '}
              {moment(issue.createdAt).format('hh:mm A')}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

export default IssueTable
