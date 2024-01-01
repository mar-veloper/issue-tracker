import { Issue, Status } from '@prisma/client'

export interface IssueDataProps {
  issues: Issue[]
  maxPage: number
  count: number
  limit: number
  currentPage: number
  sortBy: IssueSortBy
  sortOrder: IssueSortOrder
  status?: Status
}

export enum IssueSortBy {
  title = 'title',
  status = 'status',
  createdAt = 'createdAt',
}

export enum IssueSortOrder {
  asc = 'asc',
  desc = 'desc',
}

export interface IssueQuery {
  page?: string
  limit?: string
  sortBy?: IssueSortBy
  sortOrder?: IssueSortOrder
  status?: Status
}
