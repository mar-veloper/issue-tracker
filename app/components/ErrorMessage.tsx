import { Text } from '@radix-ui/themes'
import React, { PropsWithChildren } from 'react'
import { If } from 'react-if'

const ErrorMessage = ({ children }: PropsWithChildren) => {
  return (
    <If condition={!!children}>
      <Text color="red" as="p">
        {children}
      </Text>
    </If>
  )
}

export default ErrorMessage
