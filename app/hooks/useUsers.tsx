import routes from '@/app/routes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { User } from 'next-auth'

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axios.get<User[]>(`${routes.API.USERS}`)
      return data
    },
    staleTime: 60 * 1000,
    retry: 3,
  })

export default useUsers
