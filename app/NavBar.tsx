'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classNames from 'classnames'
import routes from './routes'
import { Box, Container, Flex } from '@radix-ui/themes'
import { useSession } from 'next-auth/react'
import { Case, Switch } from 'react-if'

const NavBar = () => {
  const currentPath = usePathname()
  const { status, data: session } = useSession()

  const links = [
    {
      label: 'Dashboard',
      href: routes.HOMEPAGE,
    },
    {
      label: 'Issues',
      href: routes.ISSUES.LIST,
    },
  ]

  return (
    <nav className="border-b mb-5 px-5 py-3 ">
      <Container>
        <Flex className="" justify="between">
          <Flex align="center" gap="3">
            <Link href={routes.HOMEPAGE}>
              <AiFillBug />
            </Link>
            <ul className="flex items-center space-x-6">
              {links.map((link) => {
                const isActive = link.href === currentPath
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={classNames({
                        'text-zinc-900': isActive,
                        'text-zinc-500': !isActive,
                        'hover:text_zinc_800 transition-colors': true,
                      })}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </Flex>
          <Box>
            <Switch>
              <Case condition={status === 'authenticated'}>
                <Flex gap="2">
                  {session?.user!.name}
                  <Link href={routes.API.AUTH.SIGN_OUT}>Logout</Link>
                </Flex>
              </Case>
              <Case condition={status === 'unauthenticated'}>
                <Link href={routes.API.AUTH.SIGN_IN}>Login</Link>
              </Case>
            </Switch>
          </Box>
        </Flex>
      </Container>
    </nav>
  )
}

export default NavBar
