import LazyImage from '@/components/LazyImage'
import Link from 'next/link'
import { Tag } from './Tag'
import { ItemTitle } from './Title'

/**
 * 博客列表的单个卡片
 * @param {*} param0
 * @returns
 */
const BlogItem = ({ post }) => {
  const showPageCover = post?.pageCoverThumbnail !== ''

  return (
    <article className='flex flex-col-reverse sm:flex-row replace pb-6 sm:pb-8 mb-8 w-full border-dashed border-gray-100 border-b last:border-0'>
      <div className='flex-1 relative tracking-wide'>
        <ItemTitle post={post} />

        <div className='mb-2 sm:mb-4 text-gray-700 dark:text-gray-300 flex flex-row'>
          <span className='text-gray-200 text-sm sm:text-base font-normal flex justify-center items-center'>
            {post.date?.start_date || post.createdTime}
          </span>
          <div className='ml-6 flex flex-row gap-2'>
            {post.tags?.map(tag => (
              <Tag key={post.id + tag} name={tag}>{tag}</Tag>
            ))}
          </div>
        </div>

        {!post.results && (
          <p className='text-gray-400 text-sm font-normal'>{post.summary}</p>
        )}
      </div>
      {/* 图片封面 */}
      {showPageCover && (
        <div className='w-full sm:w-[30%] mb-4 sm:mb-0 sm:ml-6 select-none'>
          <Link href={post?.href}>
            <LazyImage
              src={post?.pageCoverThumbnail}
              className='w-full h-24 sm:h-32 object-cover
                cursor-pointer rounded-2xl duration-300 transition-all hover:shadow-2xl'
            />
          </Link>
        </div>
      )}
    </article>
  )
}

export default BlogItem
