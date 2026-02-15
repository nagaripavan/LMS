import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
    <div className='py-16 px-8 md:px-0'>
        <h1 className='text-4xl font-semibold '>Learn anything, anytime, anywhere</h1>
        <p className='text-gray-500 mt-3 sm:text-sm'>Incididunt sint fugiat pariatur cupidatat consectetur
        sit cillum anim id veniam aliqua proident excepteur commodo do ea.</p>

        <div className='mt-8 flex flex-row items-center justify-center'>
          <button className='bg-blue-600 text-white px-8 py-3 rounded-lg mr-4'>Get started</button>
          <button className='text-black flex gap-2'>Learn more <img className='pt-1' src={assets.arrow_icon} alt="arrow_icon" /></button>
        </div>
    </div>
  )
}

export default CallToAction