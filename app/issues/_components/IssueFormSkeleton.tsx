import { Box } from '@radix-ui/themes'
import React from 'react'
import { Skeleton } from '@/app/components'

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-3xl">
      <Skeleton width="16rem" />
      <Skeleton height="16rem" className="my-5" />
      <Skeleton width="10rem" height="3rem" />
    </Box>
  )
}

export default IssueFormSkeleton
