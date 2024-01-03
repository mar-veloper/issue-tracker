import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'

export async function GET(request: NextRequest) {
  const latestIssues = await prisma.issue.findMany({
    take: 5,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      assignedToUser: true,
    },
  })

  return NextResponse.json(latestIssues)
}
