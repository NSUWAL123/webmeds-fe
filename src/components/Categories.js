import React from 'react'
import { Link } from 'react-router-dom'

const Categories = () => {
  return (
    <div>
        <div className="flex flex-col h-[80%] ml-6 xl:ml-8">
              <Link to='/' className='my-2 mt-4 text-[#7E7E7E] hover:text-[#444444]'>Skin</Link>
              <Link to='/' className='my-2 text-[#7E7E7E] hover:text-[#444444]'>Hair</Link>
              <Link to='/' className='my-2 text-[#7E7E7E] hover:text-[#444444]'>Fragrances</Link>
              <Link to='/' className='my-2 text-[#7E7E7E] hover:text-[#444444]'>Makeup</Link>
              <Link to='/' className='my-2 text-[#7E7E7E] hover:text-[#444444]'>Personal care</Link>
              <Link to='/' className='my-2 text-[#7E7E7E] hover:text-[#444444]'>Household</Link>
              <Link to='/' className='my-2 text-[#7E7E7E] hover:text-[#444444]'>Appliances</Link>
              <Link to='/' className='my-2 text-[#7E7E7E] hover:text-[#444444]'>Mom & baby</Link>
              <Link to='/' className='my-2 text-[#7E7E7E] hover:text-[#444444]'>Health & Wellness</Link>
            </div>
    </div>
  )
}

export default Categories