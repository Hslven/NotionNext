import LazyImage from '@/components/LazyImage'

export const NotByAI = () => {
  return (
    <div className='w-full flex justify-around'>
      <LazyImage className='select-none pointer-events-none min-w-[30%]' src='/svg/not-by-ai-cn.svg' />
      <LazyImage className='select-none pointer-events-none min-w-[30%]' src='/svg/not-by-ai-jp.svg' />
      <LazyImage className='select-none pointer-events-none min-w-[30%]' src='/svg/not-by-ai-en.svg' />
    </div>
  )
}