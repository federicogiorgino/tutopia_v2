'use client'

import { AlertCircle } from 'lucide-react'
import { notFound } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import { PostInfos, PostInfosSkeleton } from './post-infos'
import { usePostDetails } from '@/hooks/use-post-details'

interface PostDetailsProps {
  postId: string
}

function PostDetails({ postId }: PostDetailsProps) {
  const { data, isLoading, isError } = usePostDetails(postId)

  const invalidDetails = !data || !data.data
  const isInvalid = invalidDetails
  return (
    <>
      {isLoading ? (
        <PostInfosSkeleton />
      ) : isError ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            There was an error loading the content. Please try again later.
          </AlertDescription>
        </Alert>
      ) : isInvalid ? (
        notFound()
      ) : (
        <PostInfos post={data.data} />
      )}
    </>
  )
}

export { PostDetails }
