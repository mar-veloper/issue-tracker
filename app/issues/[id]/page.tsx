import prisma from '@/prisma/client'
import { Box, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import DeleteIssueButton from './DeleteIssueButton'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'

interface Props {
  params: {
    id: string
  }
}
const IssueDetailPage = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id,
    },
  })

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
      <Box className="md:col-span-3">
        <Grid gap="2" width="auto">
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Grid>
      </Box>
    </Grid>
  )
}

export default IssueDetailPage
