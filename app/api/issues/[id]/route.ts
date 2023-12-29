import issueSchema from '@/app/schemas/issue.schema'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

interface Args {
  params: {
    id: string
  }
}

export async function PATCH(request: NextRequest, { params: { id } }: Args) {
  const body = await request.json()

  const validation = issueSchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(
      { errors: validation.error.format() },
      { status: 400 }
    )
  }
  const issue = await prisma.issue.findUnique({
    where: { id },
  })

  if (!issue) {
    return NextResponse.json({ errors: 'Issue not found' }, { status: 404 })
  }

  const updatedIssue = await prisma.issue.update({
    where: { id },
    data: { title: body.title, description: body.description },
  })

  return NextResponse.json(updatedIssue)
}
