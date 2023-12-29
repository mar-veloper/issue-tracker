import { Skeleton } from '@/app/components'
import { Box } from '@radix-ui/themes'

const LoadingNewIssuePage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton width="16rem" />
      <Skeleton height="16rem" className="my-5" />
      <Skeleton width="10rem" height="3rem" />
    </Box>
  )
}

export default LoadingNewIssuePage
