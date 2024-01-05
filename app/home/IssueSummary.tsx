import { Status } from '@prisma/client'
import { Card, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import routes from '../routes'

interface Props {
  open: number
  closed: number
  inProgress: number
}

interface Container {
  label: string
  count: number
  issue: Status
}

const IssueSummary = ({ closed, inProgress, open }: Props) => {
  const containers: Container[] = [
    {
      label: 'Open Issues',
      count: open,
      issue: Status.OPEN,
    },
    {
      label: 'In Progress Issues',
      count: inProgress,
      issue: Status.IN_PROGRESS,
    },
    {
      label: 'Closed Issues',
      count: closed,
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
