import React from 'react'
import pnf from "../pictures/photo/productnotfound.svg"

const ProductNotFound = () => {
  return (
    <div className='flex flex-col items-center h-[400px] text-gray-500 justify-between lg:mt-8'>
        <img src={pnf} alt="" className='w-[200px] lg:w-[250px] '/>
        <h1 className='text-xl lg:text-2xl font-semibold'>No Products Found</h1>
        <p className='text-center text-lg'>Your search did not match any products.</p>
        <p className='text-lg'>Please try again.</p>
    </div>
  )
}

export default ProductNotFound;