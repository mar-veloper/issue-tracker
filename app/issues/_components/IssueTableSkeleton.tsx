import { Table } from '@radix-ui/themes'
import React from 'react'
import { Skeleton } from '@/app/components/'

const IssueTableSkeleton = () => {
  const issues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            Status
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell text-right">
            Created
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue}>
            <Table.Cell>
              <Skeleton width={'150px'} />
              <div className="block md:hidden">
                <Skeleton width={'50px'} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <Skeleton width={'50px'} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell text-right">
              <Skeleton width={'200px'} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

export default IssueTableSkeleton
