import { PostDetails } from './_components/post-details'

async function PostPage({ params }: { params: { id: string } }) {
  const { id } = await params
  return (
    <div className="container mx-auto space-y-6 px-4 py-20 md:px-0">
      <PostDetails postId={id} />
    </div>
  )
}

export default PostPage
