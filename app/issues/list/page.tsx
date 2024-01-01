import { IssueStatusBadge, Link } from '@/app/components'
import prisma from '@/prisma/client'
import { Flex, Table } from '@radix-ui/themes'
import IssueActions from './IssueActions'
import routes from '@/app/routes'
import { Issue, Status } from '@prisma/client'
import NextLink from 'next/link'
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons'

interface Props {
  searchParams: {
    status: Status
    sortBy: keyof Issue
    sortOrder: 'asc' | 'desc'
  }
}

interface Column {
  label: string
  value: keyof Issue
  className?: string
}

const IssuesPage = async ({ searchParams }: Props) => {
  const { sortBy, sortOrder, status } = searchParams

  const columns: Column[] = [
    {
      label: 'Issue',
      value: 'title',
    },
    {
      label: 'Status',
      value: 'status',
      className: 'hidden md:table-cell',
    },
    {
      label: 'Created',
      value: 'createdAt',
      className: 'hidden md:table-cell',
    },
  ]

  const statuses = Object.values(Status)
  const queryStatus = statuses.includes(status) ? status : undefined

  const isSortedByTitle = sortBy === 'title'
  const defaultSortOrder = isSortedByTitle ? 'asc' : 'desc'

  const isOrderByKeyValid = columns
    .map((column) => column.value)
    .includes(sortBy)

  const orderByKey = isOrderByKeyValid ? sortBy : 'createdAt'

  const querySortOrder = ['asc', 'desc'].includes(sortOrder)
    ? sortOrder
    : undefined

  const activeSortOrder = querySortOrder || defaultSortOrder
  const isSortAscending = activeSortOrder === 'asc'

  const toggleSortOrder = () => (isSortAscending ? 'desc' : 'asc')
  const renderArrowIcon = () =>
    isSortAscending ? <ArrowUpIcon /> : <ArrowDownIcon />

  const issues = await prisma.issue.findMany({
    where: {
      status: queryStatus,
    },
    orderBy: {
      [orderByKey]: activeSortOrder,
    },
  })

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => {
              const isSortActive = sortBy === column.value
              const sortOrder = isSortActive
                ? toggleSortOrder()
                : defaultSortOrder
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
                        sortOrder,
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
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export const dynamic = 'force-dynamic'

export default IssuesPage
