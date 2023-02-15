import React, { useEffect, useState } from "react";
import testpic from "../../pictures/Test/meadbery.png";
import close from "../../pictures/icons/close.svg";
import axios from "axios";
import { config } from "../../utils/config";

const CartItem = (props) => {
  const cartItem = props.cartItem;
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(cartItem.quantity);

  useEffect(() => {
    (async () => {
      const product = await axios.get(
        `http://localhost:5000/products/id/${cartItem.productId}`,
        config
      );
      // console.log(product)
      setProduct(product.data);
    })();
  }, []);

  //when in cart page '-' or '+' btn is clicked as qty is changed
  useEffect(() => {
    (async () => {
      const cartToBeUpdated = {
        cartId: cartItem._id,
        quantity: quantity,
      };
      const response = await axios.post(
        "http://localhost:5000/cart/editCart",
        cartToBeUpdated,
        config
      );
      console.log(response.data);
    })();
  }, [quantity]);

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const removeFromCart = async () => {
    const response = await axios.delete(
      "http://localhost:5000/cart/removeCart",
      { cartId: cartItem._id },
      config
    );
    console.log(response.data);
  };

  return (
    <div className="flex justify-between items-center py-4 border-b border-slate-300 sm:px-6">
      <div className="flex items-center w-[80%] sm:w-[60%] justify-between lg:w-[70%]">
        <input type="checkbox" className="w-4 h-4 sm:w-5 sm:h-5" />
        <img
          src={product.productPicURL}
          alt=""
          className="w-[60px] h-[60px] border rounded-md sm:w-[100px] sm:h-[100px]"
        />
        <div className="w-1/2">
          <p className="my-2 font-medium">{product.pname}</p>
          <div className="flex">
            <p className="mr-3">Quantity:</p>
            <div className="flex items-center">
              <div
                className="w-5 h-5 bg-[#37474F] flex justify-center items-center text-white rounded-md mr-3 cursor-pointer"
                onClick={() => {
                  decreaseQty();
                }}
              >
                -
              </div>
              <p className="">{quantity}</p>
              <div
                className="w-5 h-5 bg-[#37474F] flex justify-center items-center text-white rounded-md  ml-3 cursor-pointer"
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
              >
                +
              </div>
            </div>
          </div>
          <div className="sm:hidden">
            <p className="my-2">
              <strike>Rs. {product.price}</strike> -{product.discountPct}%
            </p>
            <p className="text-[#E25247]">Rs. {product.offerPrice}</p>
          </div>
        </div>
      </div>

      <div className="sm:flex sm:w-[28%] sm:justify-between">
        <div className="hidden sm:block">
          <p className="text-[#7A7A7A]">
            <strike>Rs. {product.price}</strike> -{product.discountPct}%
          </p>
          <p className="text-[#E25247]">Rs. {product.offerPrice}</p>
        </div>
        <img
          src={close}
          alt=""
          className="w-[25px] cursor-pointer"
          onClick={() => {
            removeFromCart();
          }}
        />
      </div>
    </div>
  );
};

export default CartItem;
