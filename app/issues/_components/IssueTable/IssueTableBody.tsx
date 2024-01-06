'use client'
import { IssueStatusBadge } from '@/app/components'
import routes from '@/app/routes'
import { Table } from '@radix-ui/themes'
import moment from 'moment'
import Link from 'next/link'
import { useIssueContext } from '../../../contexts/IssueContext'

const IssueTableBody = () => {
  const { issues } = useIssueContext()
  return (
    <Table.Body>
      {issues.map((issue) => (
        <Table.Row key={issue.id}>
          <Table.Cell>
            <Link href={`${routes.ISSUES.MAIN}/${issue.id}`}>
              {issue.title}
            </Link>
            <div className="block md:hidden col-span-4">
              <IssueStatusBadge status={issue.status} />
            </div>
          </Table.Cell>
          <Table.Cell className="hidden md:table-cell">
            <IssueStatusBadge status={issue.status} />
          </Table.Cell>
          <Table.Cell className="hidden md:table-cell text-right">
            {moment(issue.createdAt).format('MMM DD, YYYY')}{' '}
            {moment(issue.createdAt).format('hh:mm A')}
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  )
}

export default IssueTableBody
