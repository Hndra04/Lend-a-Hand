import React from 'react'

const Partners = () => {
  const images = [
    'assets/Images/BCA.jpeg',
    'assets/Images/binus.jpg',
    'assets/Images/unicef.png',
    'assets/Images/apple.png',
    'assets/Images/firebase.png',
    'assets/Images/vscode.png'
  ]

  return (
    <div className='flex flex-col-reverse lg:flex-row justify-center py-20 gap-10 px-[10%]'>
      <div className='w-full'>
        <div className='grid grid-cols-2 w-full gap-10'>
          {images.map((img, index) => (
            <div key={index} className='flex w-full justify-center items-center h-20'>
              <div>
                <img className='w-20 rounded-full object-fill' src={img} alt={`Image ${index + 1}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='raleway w-full'>
        <h1 className='text-4xl font-bold'>Our Partners</h1>
        <p className='text-md font-semibold pt-10'>We collaborate with social organization and sponsors to help achieve our mission. <br /><br /> These partnerships ensure that every activity/donation listed is not only credible but is also impactful. <br /><br /> Together, we're opening a door to a brighter future.</p>

        <div className='flex sm:flex-col flex-col lg:flex-row justify-between pt-10'>
          <div>
            <button className='font-bold text-white px-4 py-2 rounded-3xl' style={{backgroundColor: '#EE6C4D'}}>Become a partner</button>
          </div>
          
          <div>
            <button className='font-bold px-4 py-2 rounded-3xl' style={{color: '#63B8F6'}}>See all partners {'>'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Partners