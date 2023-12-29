import { Box, Card, Flex, Heading } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingIssueDetailPage = async () => {
  return (
    <Box>
      <Heading>
        <Skeleton width="16rem" />
      </Heading>
      <Flex gap="2" my="2">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton width="16rem" />
        <Skeleton height="16rem" className="my-5" />

        <Skeleton count={2} />
      </Card>
    </Box>
  )
}

export default LoadingIssueDetailPage
