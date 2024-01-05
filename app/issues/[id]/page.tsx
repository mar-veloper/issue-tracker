import prisma from '@/prisma/client'
import { Box, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import DeleteIssueButton from './DeleteIssueButton'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'
import AssigneeSelect from './AssigneeSelect'
import { cache } from 'react'

interface Props {
  params: {
    id: string
  }
}

const fetchIssue = cache((issueId: string) =>
  prisma.issue.findUnique({
    where: {
      id: issueId,
    },
  })
)

const IssueDetailPage = async ({ params: { id } }: Props) => {
  const session = await getServerSession(authOptions)

  const issue = await fetchIssue(id)

  if (!issue) notFound()

  return (
    <Grid
      columns={{
        initial: '1',
        sm: '12',
      }}
      gap="5"
    >
      <Box className="md:col-span-9">
        <IssueDetails issue={issue} />
      </Box>

      {session && (
        <Box className="md:col-span-3">
          <Grid gap="2" width="auto">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Grid>
        </Box>
      )}
    </Grid>
  )
}

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(params.id)

  return {
    title: issue?.title,
    description: 'Details of issue ' + issue?.id,
  }
}

export default IssueDetailPage
