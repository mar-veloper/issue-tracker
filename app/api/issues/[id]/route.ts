import authOptions from '@/app/auth/authOptions'
import { patchIssueSchema } from '@/app/schemas/issue.schema'
import prisma from '@/prisma/client'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

interface Args {
  params: {
    id: string
  }
}

export async function PATCH(request: NextRequest, { params: { id } }: Args) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { title, description, assignedToUserId } = body

  const validation = patchIssueSchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(
      { errors: validation.error.format() },
      { status: 400 }
    )
  }

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: body.assignedToUserId },
    })

    if (!user) {
      return NextResponse.json({ errors: 'Invalid user.' }, { status: 400 })
    }
  }

  const issue = await prisma.issue.findUnique({
    where: { id },
  })

  if (!issue) {
    return NextResponse.json({ errors: 'Issue not found' }, { status: 404 })
  }

  const updatedIssue = await prisma.issue.update({
    where: { id },
    data: {
      title,
      description,
      assignedToUserId,
    },
  })

  return NextResponse.json(updatedIssue)
}

export async function DELETE(request: NextRequest, { params: { id } }: Args) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const issue = await prisma.issue.findUnique({
    where: { id },
  })

  if (!issue) {
    return NextResponse.json({ errors: 'Issue not found' }, { status: 404 })
  }

  const deletedIssue = await prisma.issue.delete({
    where: { id },
  })

  return NextResponse.json(
    {
      message: `Issue ${deletedIssue.title} deleted successfully`,
    },
    { status: 200 }
  )
}
