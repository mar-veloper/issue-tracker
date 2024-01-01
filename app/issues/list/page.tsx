import { IssueQuery } from '@/app/types/issue.types'
import IssueTable from '../_components/IssueTable'
import IssueActions from './IssueActions'
import { IssueContextProvider } from './IssueContext'

interface Props {
  searchParams: IssueQuery
}

const IssuesPage = async ({ searchParams }: Props) => {
  return (
    <IssueContextProvider searchParams={searchParams}>
      <div>
        <IssueActions />
        <IssueTable searchParams={searchParams} />
      </div>
    </IssueContextProvider>
  )
}

export const dynamic = 'force-dynamic'

export default IssuesPage
