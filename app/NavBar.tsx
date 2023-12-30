'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classNames from 'classnames'
import routes from './routes'

const NavBar = () => {
  const currentPath = usePathname()

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
      <nav className="w-full max-w-3xl mx-auto flex justify-between space-x-6  px-5 ">
        <Link href={routes.HOMEPAGE}>
          <AiFillBug />
        </Link>
        <ul className="flex space-x-6">
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
      </nav>
    </div>
  )
}

export default NavBar
