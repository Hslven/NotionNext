import { siteConfig } from '@/lib/config'
import { MenuItemDrop } from './MenuItemDrop'

/**
 * 导航菜单列表
 * @param {*} props
 * @returns
 */
export const MenuList = props => {
  const { customNav, customMenu } = props

  let links = []

  if (customNav) {
    links = links.concat(customNav)
  }

  // 如果 开启自定义菜单，则不再使用 Page 生成菜单。
  if (siteConfig('CUSTOM_MENU')) {
    links = customMenu
  }

  if (!links || links.length === 0) {
    return null
  }

  return (
    <nav className='w-full bg-transparent'>
      <ul className='flex'>
        {links.map((link, index) => (
          <MenuItemDrop key={index} link={link} />
        ))}
      </ul>
    </nav>
  )
}
