import React from 'react'
import { useSelector } from 'react-redux';
import img from "../../pictures/Test/meadbery.png"

const CartSummary = (props) => {
  const {order, product} = props;
  console.log(order, product)

  const {cartProducts} = useSelector((state) => state.cart)
  return (
    <div className='flex border-b py-3 border-gray-400'>
      
        <img src={product.productPicURL} alt="" className='w-[55px] border rounded-md'/>
        <div className='ml-5 flex flex-col justify-around'>
            <p>{product.pname}</p>
            <p>Quantity: {order.quantity}</p>
        </div>
    </div>
  )
}

export default CartSummary