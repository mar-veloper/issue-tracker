'use client'
import { Spinner } from '@/app/components'
import { TrashIcon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Else, If, Then } from 'react-if'

interface Props {
  issueId: string
}

const DeleteIssueButton = ({ issueId }: Props) => {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      const res = await fetch(`/api/issues/${issueId}`, {
        method: 'DELETE',
      })
      setIsDeleting(false)

      router.push('/issues')
      alert(res)
    } catch (error) {
      setIsDeleting(false)
      console.log(error)
    }
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">
          <TrashIcon />
          Delete Issue
        </Button>
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
            <Button
              color="red"
              onClick={handleDelete}
              disabled={isDeleting}
              className="hover:cursor-pointer"
            >
              <If condition={isDeleting}>
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
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default DeleteIssueButton
