'use client'
import Skeleton from '@/app/components/Skeleton'
import routes from '@/app/routes'
import { Avatar, Box, DropdownMenu, Text } from '@radix-ui/themes'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const RightNav = () => {
  const { status, data: session } = useSession()

  if (status === 'loading') return <Skeleton width="3rem" />

  if (status === 'unauthenticated')
    return (
      <Link className="nav-link" href={routes.API.AUTH.SIGN_IN}>
        Login
      </Link>
    )

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session?.user!.image!}
            fallback="?"
            radius="full"
            size="2"
            className="cursor-pointer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session?.user!.email}</Text>
          </DropdownMenu.Label>
          <Link href={routes.API.AUTH.SIGN_OUT}>
            <DropdownMenu.Item className="!cursor-pointer">
              Logout
            </DropdownMenu.Item>
          </Link>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  )
}

export default RightNav
