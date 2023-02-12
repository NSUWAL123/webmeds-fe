import React from 'react'
import img from "../../pictures/Test/meadbery.png"

const CartSummary = () => {
  return (
    <div className='flex border-b py-3 border-gray-400'>
        <img src={img} alt="" className='w-[55px] border rounded-md'/>
        <div className='ml-5 flex flex-col justify-around'>
            <p>Vitamin C tablets</p>
            <p>Quantity: 3</p>
        </div>
    </div>
  )
}

export default CartSummary