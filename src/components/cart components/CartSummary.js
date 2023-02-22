import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import img from "../../pictures/Test/meadbery.png"
import { getCartProduct } from '../../redux/cartSlice';

const CartSummary = (props) => {
  const dispatch = useDispatch();
  const {order} = props;
  const {cartProducts} = useSelector(state => state.cart)
  let product = "";

  for (let i = 0; i< cartProducts.length; i++) {
    if (order.productId === cartProducts[i]._id) {
      product = cartProducts[i]
    }
  }

  return (
    <div className='flex border-b py-3 border-gray-400'>
      
        <img src={product.productPicURL} alt="" className='w-[55px] h-[55px] border rounded-md'/>
        <div className='ml-5 flex flex-col justify-around'>
            <p>{product.pname}</p>
            <p>Quantity: {order.quantity}</p>
        </div>
    </div>
  )
}

export default CartSummary