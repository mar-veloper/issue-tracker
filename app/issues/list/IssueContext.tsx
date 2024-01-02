'use client'
import {
  IssueDataProps,
  IssueSortBy,
  IssueSortOrder,
} from '@/app/types/issue.types'
import { useSearchParams } from 'next/navigation'
import React, { ReactNode, createContext, useContext } from 'react'
import useIssues from './useIssues'

interface IssueContextType extends IssueDataProps {
  toggleSortOrder: () => IssueSortOrder
  error: unknown
  isLoading: boolean
}
const IssueContext = createContext<IssueContextType>({} as IssueContextType)

interface IssueProviderProps {
  children: ReactNode
}

export const IssueContextProvider: React.FC<IssueProviderProps> = ({
  children,
}) => {
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
