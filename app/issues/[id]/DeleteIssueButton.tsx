'use client'
import { Spinner } from '@/app/components'
import { TrashIcon } from '@radix-ui/react-icons'
import { AlertDialog, Box, Button, Flex } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Else, If, Then } from 'react-if'

interface Props {
  issueId: string
}

interface DeleteButtonProps {
  onClick?: () => void
  disabled: boolean
}

const DeleteButton = ({ onClick, disabled }: DeleteButtonProps) => (
  <Button color="red" onClick={onClick} disabled={disabled}>
    <If condition={disabled}>
      <Then>
        <Spinner />
        Deleting...
      </Then>
      <Else>
        <TrashIcon />
        Delete Issue
      </Else>
    </If>
  </Button>
)

const DeleteIssueButton = ({ issueId }: Props) => {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState(false)

  const deleteIssue = async () => {
    try {
      setIsDeleting(true)
      await fetch(`/api/issues/${issueId}`, {
        method: 'DELETE',
      })
      setIsDeleting(false)

      router.push('/issues')
      router.refresh()
    } catch (error) {
      setIsDeleting(false)
      setError(true)
      console.log(error)
    }
  }

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <DeleteButton disabled={isDeleting} />
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? This action cannot be
            undone.
          </AlertDialog.Description>
          <Flex mt="4" gap="3">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <DeleteButton onClick={deleteIssue} disabled={isDeleting} />
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            An unexpected error occurred. This issue cannot be deleted.
          </AlertDialog.Description>
          <Box mt="4">
            <AlertDialog.Action>
              <Button
                onClick={() => setError(false)}
                variant="soft"
                color="gray"
              >
                Close
              </Button>
            </AlertDialog.Action>
          </Box>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueButton
