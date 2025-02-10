import Link from 'next/link'
import { useState } from 'react'

/**
 * 支持下拉二级的菜单
 * @param {*} param0
 * @returns
 */
export const MenuItemDrop = ({ link }) => {
  const [show, changeShow] = useState(false)
  const hasSubMenu = link?.subMenus?.length > 0

  return (
    <li
      className='cursor-pointer text-gray-200/[.9] text-sm font-normal drop-shadow-md mr-4 h-8
        transition-all duration-100 hover:text-white hover:border-b-white hover:border-b-2'
      onMouseOver={() => changeShow(true)}
      onMouseOut={() => changeShow(false)}>
      {!hasSubMenu && (
        <Link href={link?.href} target={link?.target} className='pb-3'>
          {link?.icon && <i className={link?.icon} />} {link?.name}
          {hasSubMenu && <i className='ml-2 fa fa-angle-down'></i>}
        </Link>
      )}

      {hasSubMenu && (
        <div className=''>
          {link?.icon && <i className={link?.icon} />} {link?.name}
          <i
            className={`ml-2 fas fa-chevron-down duration-500 transition-all ${show ? ' rotate-180' : ''}`}></i>
        </div>
      )}

      {/* 子菜单 */}
      {hasSubMenu && (
        <ul
          className={`${show ? 'visible opacity-100 top-8' : 'invisible opacity-0 top-10'} border-gray-100  bg-white/[.8] backdrop-blur-sm transition-all duration-300 z-50 absolute block drop-shadow-lg`}>
          {link.subMenus.map((sLink, index) => {
            return (
              <li
                key={index}
                className='not:last-child:border-b-0 border-b text-gray-700 hover:bg-gray-50/[.8] tracking-widest transition-all duration-200 py-3 pr-6 pl-3 z-50'>
                <Link href={sLink.href} target={link?.target}>
                  <span className='text-sm text-nowrap font-extralight z-50'>
                    {link?.icon && <i className={sLink?.icon}> &nbsp; </i>}
                    {sLink.title}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </li>
  )
}
