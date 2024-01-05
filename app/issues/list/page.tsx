import { IssueQuery } from '@/app/types/issue.types'
import IssueTable from '../_components/IssueTable'
import IssueTableBody from '../_components/IssueTable/IssueTableBody'
import IssueTableHeader from '../_components/IssueTable/IssueTableHeader'
import IssueActions from './IssueActions'
import { IssueContextProvider } from './IssueContext'
import IssuePagination from './IssuePagination'
import { Box } from '@radix-ui/themes'
import { Metadata } from 'next'

interface Props {
  searchParams: IssueQuery
}

const IssuesPage = async ({ searchParams }: Props) => {
  return (
    <IssueContextProvider>
      <Box>
        <IssueActions />
        <IssueTable>
          <IssueTableHeader searchParams={searchParams} />
          <IssueTableBody />
        </IssueTable>
        <IssuePagination />
      </Box>
    </IssueContextProvider>
  )
}

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues.',
}

export default IssuesPage
