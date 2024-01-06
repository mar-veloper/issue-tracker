'use client'
import { Card } from '@radix-ui/themes'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { useIssueContext } from '../contexts/IssueContext'

const IssueChart = () => {
  const { openCount, closedCount, inProgressCount } = useIssueContext()

  const data = [
    {
      label: 'Open',
      value: openCount,
    },
    {
      label: 'In Progress',
      value: inProgressCount,
    },
    {
      label: 'Closed',
      value: closedCount,
    },
  ]
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{
              fill: 'var(--accent-9)',
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default IssueChart
