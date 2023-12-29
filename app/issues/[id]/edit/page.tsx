import React from 'react'
import IssueForm from '../../_components/IssueForm'
import { notFound } from 'next/navigation'
import prisma from '@/prisma/client'

interface Props {
  params: {
    id: string
  }
}

const EditIssuePage = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: id,
    },
  })

  if (!issue) notFound()

  return <IssueForm issue={issue} />
}

export default EditIssuePage
