import { Grid } from '@radix-ui/themes'
import { Metadata } from 'next'
import { IssueContextProvider } from './contexts/IssueContext'
import IssueChart from './home/IssueChart'
import IssueSummary from './home/IssueSummary'
import LatestIssue from './home/LatestIssue'

export default async function Home() {
  return (
    <IssueContextProvider>
      <Grid
        columns={{
          initial: '1',
          sm: '2',
        }}
        gap="5"
      >
        <Grid gap="5">
          <IssueSummary />
          <IssueChart />
        </Grid>
        <LatestIssue />
      </Grid>
    </IssueContextProvider>
  )
}

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summary of project issues.',
}

export const dynamic = 'force-dynamic'
