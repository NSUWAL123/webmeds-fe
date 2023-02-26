import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeAdminOrderState } from "../../../redux/adminOrderSlice";

const Order = (props) => {
  const { delState, delOptions, order } = props;
  console.log(order);
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const orderLine = order.orderLine;
  // console.log(orderLine)
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let userId = order.userId;
      const user = await axios.get(
        `http://localhost:5000/user/getUserById/${userId}`,
        config
      );
      setUser(user.data);

      const products = [];
      for (let i = 0; i < orderLine.length; i++) {
        const product = await axios.get(
          `http://localhost:5000/products/id/${orderLine[i].productId}`,
          config
        );
        products.push(product.data);
      }
      setProducts(products);
    })();
  }, []);

  // Button actions
  // 1. FULFILL ORDER
  const fulfillOrder = async () => {
    const state = {
      id: order._id,
      deliveryStatus: delOptions.processed,
    };
    const orderUpdate = await axios.put(
      `http://localhost:5000/order/updateOrder`,
      state,
      config
    );
    dispatch(changeAdminOrderState(state));
  };

  // 2. OUT FOR DELIVERY
  const outForDeliveryOrder = async () => {
    const state = {
      id: order._id,
      deliveryStatus: delOptions.ofd,
    };
    const orderUpdate = await axios.put(
      `http://localhost:5000/order/updateOrder`,
      state,
      config
    );
    dispatch(changeAdminOrderState(state));
  };

  // 3. DELIVERED
  const deliveredOrder = async () => {
    const state = {
      id: order._id,
      deliveryStatus: delOptions.delivered,
    };
    const orderUpdate = await axios.put(
      `http://localhost:5000/order/updateOrder`,
      state,
      config
    );
    dispatch(changeAdminOrderState(state));
  };
  console.log(user);
  console.log(products);

  return (
    <div className="border-b-[1px] border-black my-6">
      <div className="text-gray-500 md:flex md:justify-between">
        <p>Placed on: {order.date.split("T")[0]}</p>
        <p>Placed by: {user.name}</p>
      </div>

      <div className="border-b-[1px] border-gray-300">
        {/* looping products */}
        {products.map((prod) => {
          return (
            <div className="flex items-center my-2">
              <img
                src={prod.productPicURL}
                alt=""
                srcset=""
                className="w-[60px] h-[60px] mr-4 border rounded-md my-1"
              />
              <div className="">
                <p className="font-medium">{prod.pname}</p>

                {/* looping orderline to return quantity of each order item, condition ===> productId match hunuparyo, there is no condition productId doesn't match */}
                {orderLine.map((ord) => {
                  if (ord.productId === prod._id) {
                    return (
                      <p>
                        Quantity{" "}
                        <span className="font-semibold">x{ord.quantity}</span>
                      </p>
                    );
                  }
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="h-[80px] flex flex-col justify-around mb-2">
        <div className="flex justify-between">
          <p className="font-semibold">Items: {order.totalItems}</p>
          <p className="font-semibold text-[#E25247]">
            Total: {order.grandTotal}
          </p>
        </div>

        {/* This div contains different button to be displayed when status changes. */}
        <div className="flex justify-around ">
          {/* 1. Renders when delivery status is pending */}
          {delState === delOptions.pending && (
            <>
              <button className="bg-[#E25247] text-white px-2 py-1 rounded-md font-medium hover:bg-[#f06359]">
                Decline Order
              </button>
              <button
                className="bg-[#1bc57e] text-white px-2 py-1 rounded-md font-medium hover:bg-[#40d798]"
                onClick={() => fulfillOrder()}
              >
                Fulfill Order
              </button>
            </>
          )}

          {/* 2. Renders when delivery status is processed */}
          {delState === delOptions.processed && (
            <>
              <button className="bg-[#E25247] text-white px-2 py-1 rounded-md font-medium hover:bg-[#f06359]">
                Cancel Order
              </button>
              <button
                className="bg-[#1bc57e] text-white px-2 py-1 rounded-md font-medium hover:bg-[#40d798]"
                onClick={() => outForDeliveryOrder()}
              >
                Out for Delivery
              </button>
            </>
          )}

          {/* 3. Renders when delivery status is out-for-delivery */}
          {delState === delOptions.ofd && (
            <>
              <button className="bg-[#E25247] text-white px-2 py-1 rounded-md font-medium hover:bg-[#f06359]">
                Delivery Failed
              </button>
              <button
                className="bg-[#1bc57e] text-white px-2 py-1 rounded-md font-medium hover:bg-[#40d798]"
                onClick={() => deliveredOrder()}
              >
                Delivered
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
