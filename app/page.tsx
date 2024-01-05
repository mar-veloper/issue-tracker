import { Status } from '@prisma/client'
import IssueSummary from './home/IssueSummary'
import LatestIssue from './home/LatestIssue'
import prisma from '@/prisma/client'

export default async function Home() {
  const open = await getCount(Status.OPEN)
  const inProgress = await getCount(Status.IN_PROGRESS)
  const closed = await getCount(Status.CLOSED)

  return (
    <>
      <LatestIssue />
      <IssueSummary closed={closed} inProgress={inProgress} open={open} />
    </>
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
