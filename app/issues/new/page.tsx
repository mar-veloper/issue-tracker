'use client'

import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { If } from 'react-if'
import { zodResolver } from '@hookform/resolvers/zod'
import issueSchema from '@/app/schemas/issue.schema'
import { z } from 'zod'
import ErrorMessage from '@/app/components/ErrorMessage'

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

  return (
    <div className="max-w-xl ">
      <If condition={error}>
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      </If>
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data)
            router.push('/')
          } catch (error) {
            setError('An unexpected error occurred.')
          }
        })}
        className="space-y-3"
      >
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
        <Button>Submit New Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage
