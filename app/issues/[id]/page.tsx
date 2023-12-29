import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import delay from 'delay'
import { notFound } from 'next/navigation'
import React from 'react'
import ReactMarkdown from 'react-markdown'

interface Props {
  params: {
    id: string
  }
}
const DetailPage = async ({ params }: Props) => {
  await delay(2000)

  const issue = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!issue) notFound()

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="2" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  )
}

export default DetailPage
