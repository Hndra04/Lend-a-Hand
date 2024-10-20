import React from 'react'

const Partners = () => {
  return (
    <div className='flex justify-between py-20'>
      <div className='grid grid-cols-2 w-1/2 pl-36'>
        <img src="" alt="tes" />
        <img src="" alt="tes" />
        <img src="" alt="tes" />
        <img src="" alt="tes" />
        <img src="" alt="tes" />
        <img src="" alt="tes" />
      </div>

      <div className='raleway w-1/2 pr-36'>
        <h1 className='text-4xl font-bold'>Our Partners</h1>
        <p className='text-md font-semibold pt-10'>We collaborate with social organization and sponsors to help achieve our mission. <br /><br /> These partnerships ensure that every activity/donation listed is not only credible but is also impactful. <br /><br /> Together, we're opening a door to a brighter future.</p>

        <div className='flex justify-between pt-10'>
          <button className='font-bold text-white px-4 py-2 rounded-3xl' style={{backgroundColor: '#EE6C4D'}}>Become a partner</button>
          <button className='font-bold' style={{color: '#63B8F6'}}>See all partners {'>'}</button>
        </div>
      </div>
    </div>
  )
}

export default Partners