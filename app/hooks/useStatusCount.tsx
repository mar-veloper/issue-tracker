import routes from '@/app/routes'
import { IssueDataProps, IssueQuery } from '@/app/types/issue.types'
import { Status } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const useStatusCount = (status: Status) =>
  useQuery<IssueDataProps>({
    queryKey: ['statusCount', status],
    staleTime: 0,
    queryFn: async () => {
      const { data } = await axios(
        `${routes.API.ISSUES.STATUS_COUNT}?status=${status}`
      )
      return data
    },
    retry: 3,
  })

export default useStatusCount
