import React from 'react'

const ReviewInstance = (props) => {

  return (
    <div style={{backgroundColor: '#1C429A'}} className='flex items-center gap-3 rounded-xl text-white'>
      <div className='px-5 py-12 flex flex-col gap-4'>
        <div className='w-28 h-28'>
          <img src="" alt="profile picture" />
        </div>
        <div className='text-xl text-center font-bold'>John Doe</div>
      </div>
      {
        props.big ?
        <div className='w-96 text-base px-3'>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”
        </div>
        :
        <></>
      }
      
    </div>
  )
}

export default ReviewInstance