import { siteConfig } from '@/lib/config'
import { MenuList } from './MenuList'
import { SocialButton } from './SocialButton'
import LazyImage from '@/components/LazyImage'

export const Header = props => {
  const renderContent = index => {
    const isVisible = index === 0
    const order = index === 0 ? siteConfig('TITLE_CARD_ORDER') || 9 : index

    return (
      <div
        className={`rounded-xl bg-white/[.6] w-full py-4 px-5 backdrop-blur-sm transition duration-300 relative bottom-5 ${!isVisible ? 'invisible' : ''}`}
        style={{ order }}>
        <div className='flex items-center'>
          <div className='hover:rotate-45 hover:scale-125 transform duration-200 z-50'>
            <LazyImage
              className='rounded-full shadow-lg pointer-events-none select-none'
              src={props?.avatar || siteConfig('AVATAR')}
              width={100}
              height={100}
            />
          </div>
          <div className='flex flex-col flex-1 ml-7 size-full'>
            <h1 className='text-2xl my-0 text-[var(--theme-color)] drop-shadow-[0_2px_10px_rgba(231,156,0,0.6)] font-bold'>
              {props?.title || siteConfig('TITLE')}
            </h1>
            <div className='text-sm font-normal w-full text-gray-500 mt-2 flex jusitify-between'>
              <span className='flex-1'>
                {props?.description || siteConfig('DESCRIPTION')}
              </span>
              <SocialButton />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <header
      style={{ backgroundColor: `${siteConfig('AUTUMN_BANNER_BG_COLOR')}` }}
      className='w-full h-[430px] flex justify-center z-10'>
      <div
        style={{ backgroundImage: `url(${siteConfig('HOME_BANNER_IMAGE')})` }}
        className={`max-w-[var(--content-width)] size-full px-5 flex justify-center items-center flex-col relative bg-cover bg-center gap-4`}>
        {Array.from({ length: 3 }).map((_,index) => renderContent(index))}
        <div className='absolute w-full bottom-0 px-5'>
          <MenuList {...props} />
        </div>
      </div>
    </header>
  )
}
