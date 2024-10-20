import React from 'react'

const Jumbotron = () => {
  return (
    <div className='bg-gray-300 px-40 py-10 raleway'>

      <div className='bg-white px-16 py-10 rounded-3xl'>
        <div className='flex items-center gap-3 py-2'>
          <img src="/assets/Icons/Logo_Black.png" alt="" />
          <div className='font-bold text-4xl'>Lend-a-Hand</div>
        </div>

        <div className='font-bold text-4xl py-2' style={{color: '#EE6C4D'}}>
          Contribute to a Better Tomorrow
        </div>

        <div className='flex justify-center py-3'>
          <img className='w-3/4 rounded-3xl' src="./assets/Images/bags.jpg" alt="" />
        </div>

        <div>
          <div className='font-bold text-2xl py-4' style={{color: '#EE6C4D'}}>
            At Lend-a-Hand, we make it easy for you to contribute in making the world a better place
          </div>

          <div className='font-normal text-xl'>
            Whether you want to contribute through donations or take action directly, Lend-a-Hand connects you with social organizations both near and far. From local community groups to global nonprofits, we make it easy for you to offer your support and track the difference you're making, one good deed at a time.
          </div>

          <div className='flex justify-between pt-12 pb-3'>
            <div className='w-1/3 flex flex-col items-center gap-3'>
              <img className='w-1/6' src="./assets/Icons/Guy_Point_Door.png" alt="" />
              <p className='font-bold text-xl text-center'>Participate in social activities/campaign</p>
            </div>

            <div className='w-1/3 flex flex-col items-center gap-3'>
              <img className='w-1/6' src="./assets/Icons/Box.png" alt="" />
              <p className='font-bold text-xl text-center'>Donate to those in need</p>
            </div>

            <div className='w-1/3 flex flex-col items-center gap-3'>
              <img className='w-1/6' src="./assets/Icons/Globe.png" alt="" />
              <p className='font-bold text-xl text-center'>Help make the world a better place</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Jumbotron