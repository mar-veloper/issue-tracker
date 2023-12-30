'use client'
import routes from '@/app/routes'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

interface Props {
  issueId: string
}

const EditIssueButton = ({ issueId }: Props) => {
  return (
    <Link href={`${routes.ISSUES.EDIT}/${issueId}`}>
      <Button className="w-full">
        <Pencil2Icon />
        Edit Issue
      </Button>
    </Link>
  )
}

export default EditIssueButton
