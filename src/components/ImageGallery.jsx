import React from 'react'

const ImageGallery = () => {
  const images = [
    './assets/Images/kids_smiling.jpeg',
    './assets/Images/planting.png',
    './assets/Images/cleaning.jpg',
    './assets/Images/river_cleaning.jpg',
    './assets/Images/teacher.jpg',
    './assets/Images/people_cleaning.jpg',
    './assets/Images/clothing_donation.jpg',
    './assets/Images/donating_blood.jpg',
    './assets/Images/teaching.jpeg',
    './assets/Images/girl_holding_bag.jpg'
  ]

  return (
    <div className='flex gap-2 px-10 pb-10 pt-2' style={{height: '650px'}}>
      <div className='flex flex-col gap-3 w-2/6'>
        <div className='h-2/5'>
          <img className='w-full h-full rounded-xl opacity-60 object-cover' src={images[0]} alt="" />
        </div>

        <div className='flex gap-3 h-3/5 w-full'>
          <div className='w-1/2 h-full rounded-xl overflow-hidden'>
            <img className='w-full h-full object-cover opacity-60' src={images[1]} alt="" />
          </div>
          <div className='w-1/2 h-full rounded-xl overflow-hidden'>
            <img className='w-full h-full object-cover opacity-60' src={images[2]} alt="" />
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-3 w-1/6'>
        <img className='w-full h-3/5 object-cover rounded-xl opacity-60' src={images[3]} alt="" />
        <img className='w-full h-2/5 object-cover rounded-xl opacity-60' src={images[4]} alt="" />
      </div>
      
      <div className='flex flex-col gap-3 w-2/6'>
        <div className='h-2/5'>
          <img className='w-full h-full rounded-xl opacity-60 object-cover' src={images[5]} alt="" />
        </div>

        <div className='flex gap-3 h-3/5 w-full'>
          <div className='w-1/2 h-full rounded-xl overflow-hidden'>
            <img className='w-full h-full object-cover opacity-60' src={images[6]} alt="" />
          </div>
          <div className='w-1/2 h-full rounded-xl overflow-hidden'>
            <img className='w-full h-full object-cover opacity-60' src={images[7]} alt="" />
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-3 w-1/6'>
        <img className='w-full h-3/5 object-cover rounded-xl opacity-60' src={images[8]} alt="" />
        <img className='w-full h-2/5 object-cover rounded-xl opacity-60' src={images[9]} alt="" />
      </div>

      <div></div>
    </div>
  )
}

export default ImageGallery