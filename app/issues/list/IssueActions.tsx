import routes from '@/app/routes'
import { Button, Flex } from '@radix-ui/themes'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import React from 'react'
import { Skeleton } from '@/app/components'

const IssueStatusFilter = dynamic(() => import('./IssueStatusFilter'), {
  ssr: false,
  loading: () => <Skeleton width="55px" height="32px" />,
})

const IssueActions = () => {
  return (
    <Flex mb="5" justify="between">
      <IssueStatusFilter />
      <Link href={routes.ISSUES.NEW}>
        <Button>New Issue</Button>
      </Link>
    </Flex>
  )
}

export default IssueActions
