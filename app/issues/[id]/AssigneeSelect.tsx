'use client'
import routes from '@/app/routes'
import { User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Skeleton } from '@/app/components'
import { Issue } from '@prisma/client'
import toast, { Toaster } from 'react-hot-toast'
import useUser from './useUsers'
import useUsers from './useUsers'

interface Props {
  issue: Issue
}

const AssigneeSelect = ({ issue }: Props) => {
  const { data: users, error, isLoading } = useUsers()

  if (isLoading) return <Skeleton height="32px" />

  if (error) return null

  const handleAssigneeChange = (userId: string) =>
    axios
      .patch(`${routes.API.ISSUES}/${issue.id}`, {
        assignedToUserId: userId === 'unassigned' ? null : userId,
      })
      .catch(() => toast.error('An unexpected error occurred.'))

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || 'unassigned'}
        onValueChange={handleAssigneeChange}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  )
}

export default AssigneeSelect
