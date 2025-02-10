import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { ItemTitle } from './Title'
import { Tag } from './Tag'
import { NotByAI } from './NotByAI'

export const PostFooter = props => {
  const { post, nextPost } = props

  const { locale } = useGlobal()
  return (
    <>
      {post?.type !== 'Page' && siteConfig('AUTUMN_NOT_BY_AI') && (
        <div className='h-12 my-8 sm:my-16 flex justify-center'>
          <NotByAI />
        </div>
      )}
      <div className='flex flex-row gap-2'>
        {post?.tags?.map(tag => (
          <Tag key={post.id + tag} name={tag}>
            {tag}
          </Tag>
        ))}
      </div>
      {nextPost && post?.type === 'Post' ? (
        <>
          <div className='mt-8 mb-6 w-full border-b border-dashed border-gray-200' />
          <p className='text-base mb-3 font-normal text-gray-300'>
            {locale.COMMON.NEXT_POST}
          </p>
          <ItemTitle post={nextPost} />
          <div className='mt-6 mb-8 w-full border-b border-dashed border-gray-200' />
        </>
      ) : (
        <div className='my-8 w-full border-b border-dashed border-gray-200' />
      )}
    </>
  )
}
