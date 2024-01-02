'use client'
import Pagination from '@/app/components/Pagination'
import React from 'react'
import { useIssueContext } from './IssueContext'

const IssuePagination = () => {
  const { count, maxPage, currentPage, isLoading } = useIssueContext()

  if (isLoading) return null

  return (
    <Pagination count={count} maxPage={maxPage} currentPage={currentPage} />
  )
}

export default IssuePagination
