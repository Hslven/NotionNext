import Link from 'next/link'

export const Tag = props => {
  return (
    <Link
      href={`/tag/${props.name}`}
      className='rounded-full px-4 py-1 bg-gray-100/[.3] text-gray-400 text-xs sm:text-sm font-normal leading-6
        cursor-pointer transition-all duration-300 hover:bg-[var(--theme-color)] hover:text-white hover:-translate-y-1'>
      {props.children}
    </Link>
  )
}
