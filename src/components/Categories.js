import React from 'react'
import { Link } from 'react-router-dom'

const Categories = () => {
  return (
    <div>
        <div className="flex flex-col h-[80%] ml-6 xl:ml-8">
              <Link to='/' className='my-2 mt-4 text-[#7E7E7E] hover:text-[#000000] hover:scale-110 duration-300 hover:ml-[13px]'>Skin</Link>
              <Link to='/' className='my-2 text-[#7E7E7E] hover:text-[#000000] hover:scale-110 duration-300 hover:ml-[13px]'>Hair</Link>
              <Link to='/' className='my-2 text-[#7E7E7E] hover:text-[#000000] hover:scale-110 duration-300 hover:ml-[13px]'>Fragrances</Link>
              <Link to='/' className='my-2 text-[#7E7E7E] hover:text-[#000000] hover:scale-110 duration-300 hover:ml-[13px]'>Makeup</Link>
              <Link to='/' className='my-2 text-[#7E7E7E] hover:text-[#000000] hover:scale-110 duration-300 hover:ml-[13px]'>Personal care</Link>
              <Link to='/' className='my-2 text-[#7E7E7E] hover:text-[#000000] hover:scale-110 duration-300 hover:ml-[13px]'>Household</Link>
              <Link to='/' className='my-2 text-[#7E7E7E] hover:text-[#000000] hover:scale-110 duration-300 hover:ml-[13px]'>Appliances</Link>
              <Link to='/' className='my-2 text-[#7E7E7E] hover:text-[#000000] hover:scale-110 duration-300 hover:ml-[13px]'>Mom & baby</Link>
              <Link to='/' className='my-2 text-[#7E7E7E] hover:text-[#000000] hover:scale-110 duration-300 hover:ml-[13px]'>Health & Wellness</Link>
            </div>
    </div>
  )
}

export default Categories