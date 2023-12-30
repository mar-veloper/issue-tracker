import { Box } from '@radix-ui/themes'
import React from 'react'
import { Skeleton } from '@/app/components'

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-3xl">
      <Skeleton width="576px" height="32px" />
      <Skeleton width="576px" height="365px" className="mt-3 mb-10" />
      <Skeleton width="144px" height="32px" />
    </Box>
  )
}

export default IssueFormSkeleton
