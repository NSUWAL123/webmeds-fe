import React from 'react'
import wave1 from "../../../pictures/photo/wave1.svg"
import wave2 from "../../../pictures/photo/wave2.svg"

const DashUserRevenue = () => {
  return (
    <div className='flex flex-wrap gap-y-5 justify-evenly'>
      <div className='h-[10rem] w-full text-[#37474F] bg-[#e7f5ff] flex flex-col justify-evenly bg-no-repeat bg-bottom rounded-lg px-4 max-w-[320px]' style={{backgroundImage: `url(${wave1})` }}>
        <p className='font-semibold'>Customers</p>
        <p>Total customers this month</p>
        <div className='flex justify-center mb-4'>
          <h1 className='font-semibold text-2xl'>36</h1>
        </div>
      </div>

      <div className='h-[10rem] w-full text-[#37474F] bg-[#ffe7e7] flex flex-col justify-evenly bg-no-repeat bg-bottom rounded-lg px-4 max-w-[320px]' style={{backgroundImage: `url(${wave2})` }}>
        <p className='font-semibold'>Revenue</p>
        <p>Total revenue this month</p>
        <div className='flex justify-center mb-4'>
          <h1 className='font-semibold text-2xl'>196000</h1>
        </div>
      </div>
    </div>
  )
}

export default DashUserRevenue