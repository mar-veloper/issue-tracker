'use client'
import { Status } from '@prisma/client'
import { Card, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'
import { useIssueContext } from '../contexts/IssueContext'
import routes from '../routes'

interface Container {
  label: string
  count: number
  issue: Status
}

const IssueSummary = () => {
  const { openCount, closedCount, inProgressCount } = useIssueContext()

  const containers: Container[] = [
    {
      label: 'Open Issues',
      count: openCount,
      issue: Status.OPEN,
    },
    {
      label: 'In Progress Issues',
      count: inProgressCount,
      issue: Status.IN_PROGRESS,
    },
    {
      label: 'Closed Issues',
      count: closedCount,
      issue: Status.CLOSED,
    },
  ]

  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction="column" gap="1">
            <Link
              href={`${routes.ISSUES.LIST}?status=${container.issue}`}
              className="text-sm font-medium"
            >
              {container.label}
            </Link>
            <Text size="5" className="font-bold">
              {container.count}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  )
}

export default IssueSummary
