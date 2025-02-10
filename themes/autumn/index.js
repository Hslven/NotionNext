'use client'

import Comment from '@/components/Comment'
import NotionPage from '@/components/NotionPage'
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import { Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import { useEffect, forwardRef, useState, useRef } from 'react'
import BlogListArchive from './components/BlogListArchive'
import { BlogListPage } from './components/BlogListPage'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { PostLock } from './components/PostLock'
import { PostHeader } from './components/PostHeader'
import { PostFooter } from './components/PostFooter'
import { PostTitle } from './components/Title'
import { Skeleton } from './components/Skeleton'
import CONFIG from './config'
import { Style } from './style'
import Catalog from './components/Catalog'
import { Tag } from './components/Tag'

const WFullDiv = forwardRef((props, ref) => {
  return <div className='w-full' ref={ref} {...props}></div>
})
WFullDiv.displayName = 'WFullDiv'

/**
 * 基础布局框架
 * 1.其它页面都嵌入在LayoutBase中
 * 2.采用左右两侧布局，移动端使用顶部导航栏
 * @returns {JSX.Element}
 * @constructor
 */
const LayoutBase = props => {
  const { children } = props
  const { onLoading } = useGlobal()

  // 用户触发异步操作后需要等 400ms 才会显示 Skeleton
  const delay = 400
  // 如果展示了 Skeleton，至少要展示 700ms
  const minDuration = 700

  const [skeletonVisible, setSkeletonVisible] = useState(false)
  const startTime = useRef(0)

  useEffect(() => {
    const remaining = minDuration - (Date.now() - startTime.current)
    const timeout = onLoading ? delay : remaining >= 0 ? remaining : 0

    const timer = setTimeout(() => {
      setSkeletonVisible(onLoading)
      if (onLoading) {
        startTime.current = Date.now()
      } else {
        startTime.current = 0
      }
    }, timeout)

    return () => {
      clearTimeout(timer)
    }
  }, [onLoading])

  return (
    <div
      id='theme-autumn'
      className={`${siteConfig('FONT_STYLE')} bg-white scroll-smooth`}>
      <Style />

      {/* 页头 */}
      <Header {...props} />

      {/* 主体 */}
      <div
        id='container-inner'
        className='w-full relative mx-auto max-w-[var(--content-width)]'>
        <div
          id='container-wrapper'
          className={`relative mx-auto justify-center sm:flex`}>
          {/* 内容 */}
          <Transition
            as={WFullDiv}
            show={!skeletonVisible}
            appear={true}
            enter='w-full transition ease-in-out duration-700 transform order-first'
            enterFrom='w-full opacity-0 translate-y-32'
            enterTo='w-full opacity-100'
            leave='w-full transition ease-in-out duration-300 transform'
            leaveFrom='w-full opacity-100 translate-y-0'
            leaveTo='w-full opacity-0 -translate-y-32'
            unmount={false}>
            {/* 嵌入模块 */}
            {props.slotTop}
            {children}
          </Transition>
          {skeletonVisible && (
            <div className='mt-20 mb-28 px-6 w-full'>
              <Skeleton />
            </div>
          )}
        </div>
      </div>

      {/* 页脚 */}
      <Footer {...props} />
    </div>
  )
}

/**
 * 首页
 * @param {*} props
 * @returns 此主题首页就是列表
 */
const LayoutIndex = props => {
  return <LayoutPostList {...props} />
}

/**
 * 文章列表
 * @param {*} props
 * @returns
 */
const LayoutPostList = props => {
  const { category, tag } = props

  return (
    <>
      {/* 显示分类 */}
      {category && (
        <div className='pt-14 pb-6 px-6'>
          <i className='fas fa-folder-open' />
          {category}
        </div>
      )}
      {/* 显示标签 */}
      {tag && (
        <div className='pt-14 pb-6 px-6 text-4xl font-bold text-gray-800'>
          #{tag}
        </div>
      )}

      <BlogListPage {...props} />
    </>
  )
}

/**
 * 文章详情页
 * @param {*} props
 * @returns
 */
const LayoutSlug = props => {
  const { post, next, lock, validPassword } = props
  const router = useRouter()
  useEffect(() => {
    // 404
    if (!post) {
      setTimeout(
        () => {
          if (isBrowser) {
            const article = document.getElementById('notion-article')
            if (!article) {
              router.push('/404').then(() => {
                console.warn('找不到页面', router.asPath)
              })
            }
          }
        },
        siteConfig('POST_WAITING_TIME_FOR_404') * 1000
      )
    }
  }, [post])
  return (
    <>
      {lock ? (
        <PostLock validPassword={validPassword} />
      ) : (
        <div
          id='article-wrapper'
          className='px-4 sm:px-8 pb-12 sm:pb-20 relative'>
          <PostHeader post={post} />
          <NotionPage post={post} />
          <PostFooter post={post} nextPost={next} />
          <Comment frontMatter={post} />
          <aside className='hidden lg:block absolute h-full w-52 -right-56 top-36'>
            <div className='sticky top-20'>
              <Catalog toc={post?.toc} />
            </div>
          </aside>
        </div>
      )}
    </>
  )
}

/**
 * 404页
 * @param {*} props
 * @returns
 */
const Layout404 = () => {
  return <div className='flex justify-center items-center h-96 mt-20 mb-80 sm:mt-32 sm:mb-44'>
    <LazyImage className='select-none pointer-events-none min-w-[30%]' src='/svg/404.svg' />
  </div>
}

/**
 * 归档列表
 * @param {*} props
 * @returns 按照日期将文章分组排序
 */
const LayoutArchive = props => {
  const { archivePosts, tagOptions } = props
  return (
    <div className='px-6 pb-16'>
      <div className='pt-14 pb-6'><PostTitle>归档</PostTitle></div>
      <h2 className='font-bold text-gray-500 my-6'>标签</h2>
      <div className='flex flex-wrap gap-y-4'>
        {tagOptions.map(tag => (
          <Tag key={tag.name} name={tag.name}>
            {tag.name}
            {tag.count && <span className='text-gray-300'> ({tag.count})</span>}
          </Tag>
        ))}
      </div>
      {archivePosts && (
        <div className='w-full'>
          {Object.keys(archivePosts).map(archiveTitle => (
            <BlogListArchive
              key={archiveTitle}
              archiveTitle={archiveTitle}
              archivePosts={archivePosts}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * 标签列表
 * @param {*} props
 * @returns
 */
const LayoutTagIndex = LayoutArchive

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutIndex,
  LayoutPostList,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
