import React, { useState } from 'react'
import DetailsButton from './DetailsButton'

const ActionInstance = (props) => {

  return (
    <div className={`${props.width} flex flex-col gap-3 flex-shrink-0 raleway`}>
      <div>
        <img className='h-64 rounded-xl' src={props.image} alt="image" />
      </div>

      <div className='flex justify-between'>
        <div className='font-semibold'>
          <div className='blue'>
            {props.description}
          </div>

          <div>
            {props.by}
          </div>
        </div>
        <DetailsButton />
      </div>
    </div>
  )
}

ActionInstance.defaultProps = {
  description: "Lorem Ipsum",
  by: "... Foundation",
  width: 'w-2/6'
}

export default ActionInstance