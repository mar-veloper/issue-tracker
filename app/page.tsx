import { Status } from '@prisma/client'
import IssueSummary from './home/IssueSummary'
import LatestIssue from './home/LatestIssue'
import prisma from '@/prisma/client'
import IssueChart from './home/IssueChart'
import { Flex, Grid } from '@radix-ui/themes'

export default async function Home() {
  const open = await getCount(Status.OPEN)
  const inProgress = await getCount(Status.IN_PROGRESS)
  const closed = await getCount(Status.CLOSED)

  const statusProps = {
    open,
    inProgress,
    closed,
  }

  return (
    <Grid
      columns={{
        initial: '1',
        sm: '2',
      }}
      gap="5"
    >
      <Grid gap="5">
        <IssueSummary {...statusProps} />
        <IssueChart {...statusProps} />
      </Grid>
      <LatestIssue />
    </Grid>
  )
}

const getCount = async (status: Status) => {
  const count = await prisma.issue.count({
    where: {
      status,
    },
  })
  return count
}
