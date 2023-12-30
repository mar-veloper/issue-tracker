'use client'
import { Avatar, Box, DropdownMenu, Text } from '@radix-ui/themes'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Case, Switch } from 'react-if'
import routes from '@/app/routes'

const RightNav = () => {
  const { status, data: session } = useSession()

  return (
    <Box>
      <Switch>
        <Case condition={status === 'authenticated'}>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar
                src={session?.user!.image!}
                fallback="?"
                size="2"
                radius="full"
                className="cursor-pointer"
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label>
                <Text size="2">{session?.user!.email}</Text>
              </DropdownMenu.Label>
              <DropdownMenu.Item>
                <Link href={routes.API.AUTH.SIGN_OUT}>Logout</Link>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Case>
        <Case condition={status === 'unauthenticated'}>
          <Link className="nav-link" href={routes.API.AUTH.SIGN_IN}>
            Login
          </Link>
        </Case>
      </Switch>
    </Box>
  )
}

export default RightNav
