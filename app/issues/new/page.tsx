'use client'

import { ErrorMessage, Skeleton, Spinner } from '@/app/components'
import issueSchema from '@/app/schemas/issue.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Callout, TextField } from '@radix-ui/themes'
import axios from 'axios'
import 'easymde/dist/easymde.min.css'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Else, If, Then } from 'react-if'
import { z } from 'zod'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
  loading: () => <Skeleton height="400px" className="my-3" />,
})

type IssueForm = z.infer<typeof issueSchema>

const NewIssuePage = () => {
  const router = useRouter()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(issueSchema),
  })

  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true)

      await axios.post('/api/issues', data)
      setIsSubmitting(false)
      router.push('/')
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
          <TextField.Input {...register('title')} placeholder="Title" />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          <If condition={isSubmitting}>
            <Then>
              Submitting...
              <Spinner />
            </Then>
            <Else>Submit New Issue</Else>
          </If>
        </Button>
      </form>
    </div>
  )
}

export default NewIssuePage
