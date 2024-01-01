import routes from '@/app/routes'
import { IssueDataProps, IssueQuery } from '@/app/types/issue.types'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const useIssues = (query: string) =>
  useQuery<IssueDataProps>({
    queryKey: ['issues', query],
    staleTime: 0,
    queryFn: async () => {
      const { data } = await axios(`${routes.API.ISSUES}?${query}`)
      return data
    },
    retry: 3,
  })

export default useIssues
