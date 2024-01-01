'use client'
import routes from '@/app/routes'
import {
  IssueDataProps,
  IssueQuery,
  IssueSortBy,
  IssueSortOrder,
} from '@/app/types/issue.types'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
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
  searchParams: IssueQuery
}

export const IssueContextProvider: React.FC<IssueProviderProps> = ({
  children,
  searchParams,
}) => {
  //   const searchParams = useSearchParams()

  //   const queryStatus = searchParams.get('status')
  //   const queryPage = searchParams.get('page')
  //   const queryLimit = searchParams.get('limit')
  //   const querySortBy = searchParams.get('sortBy')
  //   const querySortOrder = searchParams.get('sortOrder')

  //   const buildQueryParams = () => {
  //     const params = new URLSearchParams({
  //       ...searchParams,
  //     })
  //     if (queryStatus) params.set('status', queryStatus)
  //     if (queryPage) params.set('page', queryPage)
  //     if (queryLimit) params.set('limit', queryLimit)
  //     if (querySortBy) params.set('sortBy', querySortBy)
  //     if (querySortOrder) params.set('sortOrder', querySortOrder)
  //     return params
  //   }

  const params = new URLSearchParams({
    ...searchParams,
  })
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
