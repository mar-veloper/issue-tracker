'use client'

import { Container, Flex } from '@radix-ui/themes'
import LeftNav from './LeftNav'
import RightNav from './RightNav'

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex className="" justify="between">
          <LeftNav />
          <RightNav />
        </Flex>
      </Container>
    </nav>
  )
}

export default NavBar
