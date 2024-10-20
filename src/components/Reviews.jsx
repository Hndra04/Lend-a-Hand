import React from 'react'
import ReviewInstance from './ReviewInstance'

const Reviews = () => {
  return (
    <div className='raleway flex flex-col gap-5'>
      <div className='flex justify-center items-center gap-14'>
        <img src="./assets/Icons/Logo_Black.png" alt="" />
        <div className='text-5xl font-bold'>What users have to say</div>
      </div>

      <div className='flex justify-center items-center gap-5 py-5'>
        <div>
          <button>
            <img src="/assets/Icons/Arrow_Reverse.png" alt="" className='w-8'/>
          </button>
        </div>

        <ReviewInstance />
        <ReviewInstance big={true}/>
        <ReviewInstance />

        <div>
          <button>
            <img src="/assets/Icons/Arrow.png" alt="" className='w-8'/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Reviews