'use client'
import routes from '@/app/routes'
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'

interface StatusesProps {
  label: string
  value: Status | 'ALL'
}

const statuses: StatusesProps[] = [
  {
    label: 'All',
    value: 'ALL',
  },
  {
    label: 'Open',
    value: 'OPEN',
  },
  {
    label: 'In Progress',
    value: 'IN_PROGRESS',
  },
  {
    label: 'Closed',
    value: 'CLOSED',
  },
]

const IssueStatusFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const search = searchParams.get('status')

  return (
    <Select.Root
      defaultValue={search || 'ALL'}
      onValueChange={(status) => {
        const query = status === 'ALL' ? '' : `?status=${status}`
        return router.push(`${routes.ISSUES.LIST}${query}`)
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item
            key={status.label}
            value={status.value || 'ALL'}
            disabled={!status.value}
          >
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter
