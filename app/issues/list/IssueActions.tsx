import routes from '@/app/routes'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const IssueActions = () => {
  return (
    <div className="mb-5">
      <Link href={routes.ISSUES.NEW}>
        <Button>New Issue</Button>
      </Link>
    </div>
  )
}

export default IssueActions
