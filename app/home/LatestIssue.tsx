'use client'
import { Issue, User } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import routes from '../routes'
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes'
import Link from 'next/link'
import { If } from 'react-if'
import { IssueStatusBadge } from '../components'

interface LatestIssue extends Issue {
  assignedToUser: User
}

const LatestIssue = () => {
  const issues = useQuery<LatestIssue[]>({
    queryKey: ['latestIssue'],
    staleTime: 0,
    queryFn: async () => {
      const { data } = await axios(`${routes.API.ISSUES.LATEST}`)
      return data
    },
    retry: 3,
  })

  return (
    <Card>
      <Heading size="3" mb="5">
        Latest Issue
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.data?.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between" align="center" gap="2">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`${routes.ISSUES.MAIN}/${issue.id}`}>
                      {issue.title}
                    </Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUser && (
                    <Avatar
                      src={issue.assignedToUser.image!}
                      alt={issue.assignedToUser.name!}
                      fallback="?"
                      size="2"
                      radius="full"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  )
}

export default LatestIssue
