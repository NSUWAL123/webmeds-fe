import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  changeAdminOrderState,
  declineOrderState,
} from "../../../redux/adminOrderSlice";
import khaltilogo from "../../../pictures/logo/khaltilogo.png";
import location from "../../../pictures/icons/location.svg";
import { getTokenFromLocalStorage } from "../../../utils/handleToken";

const Order = (props) => {
  const { delState, delOptions, order } = props;
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const orderLine = order.orderLine;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const adminConfig = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": getTokenFromLocalStorage(),
    },
  };

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let userId = order.userId;
      const user = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/getUserById/${userId}`,
        config
      );
      setUser(user.data);

      const products = [];
      for (let i = 0; i < orderLine.length; i++) {
        const product = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/products/id/${orderLine[i].productId}`,
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
      `${process.env.REACT_APP_BASE_URL}/order/updateOrder`,
      state,
      adminConfig
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
      `${process.env.REACT_APP_BASE_URL}/order/updateOrder`,
      state,
      adminConfig
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
      `${process.env.REACT_APP_BASE_URL}/order/updateOrder`,
      state,
      adminConfig
    );
    dispatch(changeAdminOrderState(state));
  };

  // 4. DECLINE ORDER
  const declineOrder = async () => {
    const state = {
      id: order._id,
    };
    const orderUpdate = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/order/deleteOrder/${order._id}`
    );
    dispatch(declineOrderState(state));
  };

  return (
    <div className="border-b-[1px] border-black my-6">
      <div className="flex items-center justify-start">
        <img src={location} alt="" className="w-[16px] mr-2" />
        <p className="text-xs text-[#AAAAAA]">{order.billingAddress}</p>
      </div>
      <div className="text-gray-500 md:flex md:justify-between">
        <p>Placed on: {order.date.split("T")[0]}</p>
        <p>Placed by: {user.name}</p>
      </div>

      <div className="border-b-[1px] border-gray-300 flex justify-between items-center">
        <div>
          {/* looping products */}
          {products.map((prod) => {
            return (
              <div>
                <div className="flex items-center my-2">
                  <img
                    src={prod.productPicURL}
                    alt=""
                    className="w-[60px] h-[60px] mr-4 border rounded-md my-1"
                  />
                  <div className="">
                    <p className="font-medium">{prod.pname}</p>

                    {/* looping orderline to return quantity of each order item, condition ===> productId match hunuparyo, there is no condition productId doesn't match */}
                    {orderLine.map((ord) => {
                      if (ord.productId === prod._id) {
                        return (
                          <p key={ord.productId}>
                            Quantity{" "}
                            <span className="font-semibold">
                              x{ord.quantity}
                            </span>
                          </p>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {order.paymentType === "khalti" ? (
          <div className="flex items-center">
            <p className="text-gray-400 font-medium text-sm">Paid via </p>
            <img src={khaltilogo} alt="" className="w-[60px]" />
          </div>
        ) : (
          <p className="text-gray-400 font-medium text-sm">COD</p>
        )}
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
              <button
                className="bg-[#E25247] text-white px-2 py-1 rounded-md font-medium hover:bg-[#f06359]"
                onClick={() => declineOrder()}
              >
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
              <button
                className="bg-[#E25247] text-white px-2 py-1 rounded-md font-medium hover:bg-[#f06359]"
                onClick={() => declineOrder()}
              >
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
              <button
                className="bg-[#E25247] text-white px-2 py-1 rounded-md font-medium hover:bg-[#f06359]"
                onClick={() => declineOrder()}
              >
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
