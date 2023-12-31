import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

interface Props {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params: { id } }: Props) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  if (!user)
    return NextResponse.json({ error: 'User not found' }, { status: 404 })

  return NextResponse.json(user)
}
