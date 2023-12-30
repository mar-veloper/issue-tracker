'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classNames from 'classnames'
import routes from './routes'
import { Box, Flex } from '@radix-ui/themes'
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
    <div className=" border-b h-14 flex items-center mb-5">
      <nav className="w-full max-w-3xl mx-auto flex justify-between  items-center space-x-6  px-5 ">
        <ul className="flex items-center space-x-6">
          <li>
            <Link href={routes.HOMEPAGE}>
              <AiFillBug />
            </Link>
          </li>
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
      </nav>
    </div>
  )
}

export default NavBar
