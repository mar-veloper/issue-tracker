import { Skeleton } from '@/app/components'
import { Box, Card, Flex, Heading } from '@radix-ui/themes'

const IssueDetailPageLoading = async () => {
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
        <Skeleton count={3} />
      </Card>
    </Box>
  )
}

export default IssueDetailPageLoading
