import WordCount from '@/components/WordCount'
import { PostTitle } from './Title'

export const PostHeader = props => {
  const { post } = props

  return (
    <section className='flex flex-col mt-16'>
      <PostTitle>{post?.title}</PostTitle>
      {post?.type !== 'Page' ? (
        <div className='mt-6 mb-8 text-gray-300 flex flex-row'>
          <span className='mr-3 text-gray-300 text-sm sm:text-base font-normal flex justify-center items-center'>
            {post?.date?.start_date || post?.createdTime}
          </span>
          <WordCount/>
        </div>
      ) : (
        <div className='my-2'></div>
      )}
    </section>
  )
}
