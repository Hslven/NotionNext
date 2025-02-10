import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import { useRouter } from 'next/router'
import BlogItem from './BlogItem'
/**
 * 使用分页插件的博客列表
 * @param {*} props
 * @returns
 */
export const BlogListPage = props => {
  const { page = 1, posts, postCount } = props
  const { locale, NOTION_CONFIG } = useGlobal()
  const router = useRouter()
  const totalPage = Math.ceil(
    postCount / siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)
  )
  const currentPage = +page

  const showPrev = currentPage > 1
  const showNext = page < totalPage
  const pagePrefix = router.asPath
    .split('?')[0]
    .replace(/\/page\/[1-9]\d*/, '')
    .replace(/\/$/, '')
    .replace('.html', '')

  const pageBtnClassName = `
    bg-white text-gray-600 text-base leading-4 no-underline py-2 px-4 rounded border-gray-100 border
    hover:bg-[var(--theme-color)] hover:text-white hover:-translate-y-1 hover:border-[var(--theme-color)]
    transition-all duration-300
  `

  return (
    <div className='mt-8 mb-14 sm:my-14 px-4 sm:px-6 w-full'>
      <div id='posts-wrapper'>
        {posts?.map(post => (
          <BlogItem key={post.id} post={post} />
        ))}
      </div>

      <div className='flex justify-between text-xs '>
        <Link
          href={{
            pathname:
              currentPage - 1 === 1
                ? `${pagePrefix}/`
                : `${pagePrefix}/page/${currentPage - 1}`,
            query: router.query.s ? { s: router.query.s } : {}
          }}
          className={`${pageBtnClassName} ${showPrev ? 'visible' : 'invisible'}`}>
          {locale.PAGINATION.PREV}
        </Link>

        <Link
          href={{
            pathname: `${pagePrefix}/page/${currentPage + 1}`,
            query: router.query.s ? { s: router.query.s } : {}
          }}
          className={`${pageBtnClassName} ${showNext ? 'visible' : 'invisible'}`}>
          {locale.PAGINATION.NEXT}
        </Link>
      </div>
    </div>
  )
}
