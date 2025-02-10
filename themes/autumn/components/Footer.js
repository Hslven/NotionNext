import { siteConfig } from '@/lib/config'
import Link from 'next/link'

export const Footer = () => {
  const d = new Date()
  const currentYear = d.getFullYear()
  const since = siteConfig('SINCE')
  const copyrightDate =
    parseInt(since) < currentYear ? since + '-' + currentYear : currentYear

  return (
    <footer className='w-full border-t border-gray-200/[.8] relative mt-72 md:mt-60
      before:w-full before:h-[22rem] before:z-10 before:block before:absolute before:-top-[17.6rem] before:left-0
      before:bg-[url(/images/footer-bg.png)] before:bg-no-repeat before:bg-center before:bg-cover lg:before:bg-contain
    '>
      <div className='max-w-[var(--content-width)] mx-auto my-12'>
        <p className='mx-6 text-left text-xs text-gray-500 font-bold relative z-20'>
          &copy; {`${copyrightDate}`} {siteConfig('AUTHOR')}
          {' · Powered by '}
          <Link
            href={'https://github.com/tangly1024/NotionNext'}
            className='hover:underline text-gray-700'>
            NotionNext
          </Link>
        </p>
      </div>
    </footer>
  )
}
