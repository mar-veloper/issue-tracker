import { NextRequest, NextResponse } from 'next/server'
import { issueSchema } from '../../schemas/issue.schema'
import prisma from '@/prisma/client'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'
import { Status } from '@prisma/client'
import queryString from 'query-string'

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const validation = issueSchema.safeParse(body)
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

interface QueryString {
  page?: string
  limit?: string
  status?: Status
}

export async function GET(request: NextRequest) {
  const { query } = queryString.parseUrl(request.url)

  const {
    page: reqPage,
    limit: reqLimit,
    status: reqStatus,
  } = query as QueryString

  const MAX_LIMIT = 10
  const MIN_LIMIT = 1
  const MIN_PAGE = 1
  const RADIX = 10

  const parsedLimit = reqLimit ? parseInt(reqLimit, RADIX) : MAX_LIMIT
  const notValidLimit =
    isNaN(parsedLimit) || parsedLimit > MAX_LIMIT || parsedLimit < MIN_LIMIT

  const limit = notValidLimit ? MAX_LIMIT : parsedLimit

  const isStatusValid = reqStatus && Object.values(Status).includes(reqStatus)
  const status = isStatusValid ? reqStatus : undefined
  const numberOfIssues = await prisma.issue.count({
    where: {
      status,
    },
  })
  const maxPage = Math.ceil(numberOfIssues / limit)

  const parsedPage = reqPage ? parseInt(reqPage, RADIX) : MIN_PAGE
  const notValidPage =
    isNaN(parsedPage) || parsedPage < MIN_PAGE || parsedPage > maxPage

  const page = notValidPage ? MIN_PAGE : parsedPage

  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    take: limit,
    skip: limit * (page - 1),
  })

  return NextResponse.json({
    issues,
    maxPage,
    count: numberOfIssues,
    limit,
    currentPage: page,
  })
}
