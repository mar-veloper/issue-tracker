'use client'
import routes from '@/app/routes'
import { Flex } from '@radix-ui/themes'
import classNames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiFillBug } from 'react-icons/ai'

const LeftNav = () => {
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
    <Flex align="center" gap="3">
      <Link href={routes.HOMEPAGE}>
        <AiFillBug />
      </Link>
      <ul className="flex items-center space-x-6">
        {links.map((link) => {
          console.log({ href: link.href, currentPath })

          const isActive = link.href === currentPath
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={classNames({
                  'nav-link': true,
                  '!text-zinc-900': isActive,
                })}
              >
                {link.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </Flex>
  )
}

export default LeftNav
