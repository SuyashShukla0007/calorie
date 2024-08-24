// @ts-ignore
import React from 'react'
// @ts-ignore
import tick from '../../assets/th.jpg'
import celebrate from '../../assets/th (1).jpg'
const SuccessAlert = () => {
  return (
    <div className=' w-[60vw] absolute top-16 left-[25vw] h-[45px] bg-green-100  rounded-md flex'>
     <img src={celebrate} alt="" height={'5px'}  className='m-3'/>
      <p className='ml-3 mt-2 text-gray-600'>Successfully Signed In</p>
    </div>
  )
}

export default SuccessAlert