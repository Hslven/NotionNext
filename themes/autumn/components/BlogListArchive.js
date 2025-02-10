import Link from 'next/link'

/**
 * 博客归档列表；仅归档页面使用
 * 按照日期将文章分组
 * @param {*} param0
 * @returns
 */
export default function BlogListArchive({ archiveTitle, archivePosts }) {
  return (
    <div key={archiveTitle}>
      <h2 id={archiveTitle} className='pt-8 pb-2 font-bold text-gray-500'>
        {archiveTitle}
      </h2>
      <ul className='mt-2 w-full flex flex-col gap-2'>
        {archivePosts[archiveTitle].map(post => {
          return (
            <li
              key={post.id}
              className='duration-300 transition-all text-gray-500 hover:text-[var(--theme-color)]'>
              <Link
                key={post?.id}
                href={post?.href}
                className='flex justify-between'>
                <span className='flex-1'>{post.title}</span>
                <span className='opacity-60'>{post?.publishDay}</span> &nbsp;
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
