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

  const queryStatus = searchParams.get('status')

  const defaultStatus = (queryStatus as Status | null) || 'ALL'

  const sortBy = searchParams.get('sortBy')
  const sortOrder = searchParams.get('sortOrder')

  const buildQueryParams = (
    status: string,
    sortBy: string | null,
    sortOrder: string | null
  ) => {
    const params = new URLSearchParams()
    if (status && status !== 'ALL') params.set('status', status)
    if (sortBy) params.set('sortBy', sortBy)
    if (sortOrder) params.set('sortOrder', sortOrder)
    return params
  }

  return (
    <Select.Root
      defaultValue={defaultStatus || 'ALL'}
      onValueChange={(status) => {
        const params = buildQueryParams(status, sortBy, sortOrder)
        const query = params.size ? `${params.toString()}` : ''

        return router.push(`${routes.ISSUES.LIST}?${query}`)
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item
            key={status.label}
            value={status.value || 'ALL'}
            disabled={!status.value}
            className="!cursor-pointer"
          >
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter
