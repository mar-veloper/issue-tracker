'use client'
import { Table } from '@radix-ui/themes'
import { useIssueContext } from '../../list/IssueContext'
import IssueTableSkeleton from '../IssueTableSkeleton'

interface Props {
  children: React.ReactNode
}

const IssueTable = ({ children }: Props) => {
  const { isLoading, error } = useIssueContext()

  if (isLoading) return <IssueTableSkeleton />
  if (error) return null

  return <Table.Root variant="surface">{children}</Table.Root>
}

export default IssueTable
