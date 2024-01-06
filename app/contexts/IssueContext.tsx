'use client'
import {
  IssueDataProps,
  IssueSortBy,
  IssueSortOrder,
} from '@/app/types/issue.types'
import { useSearchParams } from 'next/navigation'
import React, { ReactNode, createContext, useContext } from 'react'
import useIssues from '../hooks/useIssues'
import { Status } from '@prisma/client'
import useStatusCount from '../hooks/useStatusCount'

interface IssueContextType extends IssueDataProps {
  toggleSortOrder: () => IssueSortOrder
  error: unknown
  isLoading: boolean
  openCount: number
  closedCount: number
  inProgressCount: number
}
const IssueContext = createContext<IssueContextType>({} as IssueContextType)

interface IssueProviderProps {
  children: ReactNode
}

export const IssueContextProvider: React.FC<IssueProviderProps> = ({
  children,
}) => {
  const { data: openStatusCount } = useStatusCount(Status.OPEN)
  const { data: countStatusCount } = useStatusCount(Status.CLOSED)
  const { data: inProgressStatusCount } = useStatusCount(Status.IN_PROGRESS)

  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const query = params.size ? `${params.toString()}` : ''
  const { data, error, isLoading } = useIssues(query)

  const {
    issues,
    maxPage,
    count,
    limit,
    sortBy,
    sortOrder,
    status,
    currentPage,
  } = data || {}

  const isSortOrderAscending = sortOrder === IssueSortOrder.asc
  const toggleSortOrder = () =>
    isSortOrderAscending ? IssueSortOrder.desc : IssueSortOrder.asc
  const defaultSortOrder =
    sortBy === IssueSortBy.title ? IssueSortOrder.asc : IssueSortOrder.desc

  const contextValue: IssueContextType = {
    error,
    isLoading,
    issues: issues || [],
    maxPage: maxPage || 0,
    count: count || 0,
    limit: limit || 10,
    sortBy: sortBy || IssueSortBy.createdAt,
    toggleSortOrder,
    status,
    sortOrder: sortOrder || defaultSortOrder,
    currentPage: currentPage || 1,
    openCount: Number(openStatusCount) || 0,
    closedCount: Number(countStatusCount) || 0,
    inProgressCount: Number(inProgressStatusCount) || 0,
  }

  return (
    <IssueContext.Provider value={contextValue}>
      {children}
    </IssueContext.Provider>
  )
}

export const useIssueContext = (): IssueContextType => {
  const context = useContext(IssueContext)
  if (!context) {
    throw new Error(
      'useIssueContext must be used within an IssueContextProvider'
    )
  }
  return context
}
