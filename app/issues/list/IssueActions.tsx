import routes from '@/app/routes'
import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import IssueStatusFilter from './IssueStatusFilter'

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
