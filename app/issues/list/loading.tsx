import { Table } from '@radix-ui/themes'
import React from 'react'
import IssueActions from './IssueActions'
import { Skeleton } from '@/app/components'

const LoadingIssuesPage = () => {
  return (
    <div>
      <IssueActions />
    </div>
  )
}

export default LoadingIssuesPage
