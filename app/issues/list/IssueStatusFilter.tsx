'use client'
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'

interface StatusesProps {
  label: string
  value?: Status | 'ALL'
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
  return (
    <Select.Root>
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
