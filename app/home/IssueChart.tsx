'use client'
import { Card } from '@radix-ui/themes'
import { IssueStatusProps } from './types'
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from 'recharts'

const IssueChart = ({ closed, inProgress, open }: IssueStatusProps) => {
  const data = [
    {
      label: 'Open',
      value: open,
    },
    {
      label: 'In Progress',
      value: inProgress,
    },
    {
      label: 'Closed',
      value: closed,
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
