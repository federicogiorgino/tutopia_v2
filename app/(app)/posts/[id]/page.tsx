import { PostDetails } from './_components/post-details'

function PostPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto space-y-6 px-4 py-20 md:px-0">
      <PostDetails postId={params.id} />
    </div>
  )
}

export default PostPage
