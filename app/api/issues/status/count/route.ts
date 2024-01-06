import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { Status } from '@prisma/client'
import queryString from 'query-string'

type StatusKey = keyof typeof Status

export async function GET(request: NextRequest) {
  const { query } = queryString.parseUrl(request.url)

  if (!query.status || !Status[query.status as StatusKey])
    return NextResponse.json(
      {
        error: 'Invalid status',
      },
      { status: 400 }
    )

  const count = await prisma.issue.count({
    where: {
      status: query.status as StatusKey,
    },
  })

  return NextResponse.json(count)
}
