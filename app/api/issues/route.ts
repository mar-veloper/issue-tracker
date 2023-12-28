import { NextRequest, NextResponse } from 'next/server'
import schema from './issue.schema'
import prisma from '@/prisma/client'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const validation = schema.safeParse(body)
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  })

  return NextResponse.json(newIssue, { status: 201 })
}

export async function GET(request: NextRequest) {
  const issues = await prisma.issue.findMany()

  return NextResponse.json(issues)
}
