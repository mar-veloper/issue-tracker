'use client'
import { Spinner } from '@/app/components'
import { TrashIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
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
  )
}

export default DeleteIssueButton
