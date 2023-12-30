'use client'

import { ErrorMessage, Spinner } from '@/app/components'
import routes from '@/app/routes'
import issueSchema from '@/app/schemas/issue.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Issue } from '@prisma/client'
import { Button, Callout, TextField } from '@radix-ui/themes'
import axios from 'axios'
import 'easymde/dist/easymde.min.css'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Else, If, Then } from 'react-if'
import SimpleMDE from 'react-simplemde-editor'
import { z } from 'zod'

type IssueFormDataProps = z.infer<typeof issueSchema>

interface Props {
  issue?: Issue
}

const IssueForm = ({ issue }: Props) => {
  const router = useRouter()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormDataProps>({
    resolver: zodResolver(issueSchema),
  })

  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true)

      if (issue) {
        const { data: updatedIssue } = await axios.patch(
          `${routes.API.ISSUES}/${issue.id}`,
          data
        )
        setIsSubmitting(false)
        router.push(`${routes.ISSUES.MAIN}/${updatedIssue.id}`)
      } else {
        await axios.post(routes.API.ISSUES, data)
        setIsSubmitting(false)
        router.push(`${routes.ISSUES.LIST}`)
        router.refresh()
      }
    } catch (error) {
      setError('An unexpected error occurred.')
      setIsSubmitting(false)
    }
  })

  return (
    <div className="max-w-xl ">
      <If condition={error}>
        <Then>
          <Callout.Root color="red" className="mb-5">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        </Then>
      </If>
      <form onSubmit={onSubmit} className="space-y-3">
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register('title')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          defaultValue={issue?.description}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          <If condition={isSubmitting}>
            <Then>
              {issue ? 'Updating...' : 'Submitting...'}
              <Spinner />
            </Then>
            <Else>{issue ? 'Update Issue' : 'Submit New Issue'}</Else>
          </If>
        </Button>
      </form>
    </div>
  )
}

export default IssueForm
