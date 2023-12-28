import { Text } from '@radix-ui/themes'
import React, { PropsWithChildren } from 'react'
import { If, Then } from 'react-if'

const ErrorMessage = ({ children }: PropsWithChildren) => {
  return (
    <If condition={!!children}>
      <Then>
        <Text color="red" as="p">
          {children}
        </Text>
      </Then>
    </If>
  )
}

export default ErrorMessage
