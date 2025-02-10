import NotionIcon from '@/components/NotionIcon'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'

export const ItemTitle = props => {
  const { post } = props
  return (
    <Link href={post?.href}>
      <h2
        className='mb-2 sm:mb-4 text-gray-800 text-2xl font-bold relative
          transition-all duration-300
          before:invisible before:h-5 before:w-0 before:bg-[var(--theme-color)] before:opacity-5
          before:absolute before:top-4 before:-left-2 before:rounded-lg before:transition-all before:duration-500
          hover:before:visible hover:before:w-full hover:text-[var(--theme-color)] hover:drop-shadow(0_1px_2px_rgb(255,255,255)'>
        {siteConfig('POST_TITLE_ICON') && <NotionIcon icon={post.pageIcon} />}
        {post?.title}
      </h2>
    </Link>
  )
}

export const PostTitle = props => {
  return (
    <h1 className='text-4xl font-bold text-gray-800'>{props.children}</h1>
  )
}