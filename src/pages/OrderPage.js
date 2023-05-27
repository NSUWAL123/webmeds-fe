import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserOrder from "../components/UserOrder";
import { populateUserOrder } from "../redux/userOrderSlice";
import ProtectedRoutes from "../routes/ProtectedRoutes";
import { getTokenFromLocalStorage } from "../utils/handleToken";

const OrderPage = () => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.userOrder);

  //four different delivery states
  const delOptions = {
    pending: "pending",
    processed: "processed",
    ofd: "ofd",
    delivered: "delivered",
  };

  const [delState, setDelState] = useState(delOptions.pending);

  const filteredOrder = orders.filter(
    (order) => order.deliveryStatus === delState && order.failed === false
  );

  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": getTokenFromLocalStorage(),
    },
  };

  useEffect(() => {
    (async () => {
      let response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/order/getOrder`,
        config
      );
      let { data } = response;
      dispatch(populateUserOrder(data.order));
    })();
  }, []);

  return (
    <div className="">
      <ProtectedRoutes />
      <div className="w-full ">
        <button
          className={`${
            delState === delOptions.pending
              ? "bg-[#5D94E7] border-[#5D94E7] text-white"
              : "bg-white text-gray-500 border-gray-400 border-[2px] "
          }  px-1 py-1 border-[2px] `}
          onClick={() => setDelState(delOptions.pending)}
        >
          Pending
        </button>
        <button
          className={`${
            delState === delOptions.processed
              ? "bg-[#5D94E7] border-[#5D94E7] text-white"
              : "bg-white text-gray-500 border-gray-400 "
          }  px-1 py-1  border-[2px] `}
          onClick={() => setDelState(delOptions.processed)}
        >
          Processed
        </button>
        <button
          className={`${
            delState === delOptions.ofd
              ? "bg-[#5D94E7] border-[#5D94E7] text-white"
              : "bg-white text-gray-500 border-gray-400"
          }  px-1 py-1  border-[2px] `}
          onClick={() => setDelState(delOptions.ofd)}
        >
          To Recieve
        </button>
        <button
          className={`${
            delState === delOptions.delivered
              ? "bg-[#5D94E7] border-[#5D94E7] text-white"
              : "bg-white text-gray-500 border-gray-400"
          }  px-1 py-1  border-[2px] `}
          onClick={() => setDelState(delOptions.delivered)}
        >
          Delivered
        </button>
      </div>

      <div className="flex flex-col items-center">
        {filteredOrder.map((order) => {
          return (
            <>
              {order.failed === false && (
                <UserOrder
                  delState={delState}
                  delOptions={delOptions}
                  key={order._id}
                  order={order}
                />
              )}
            </>
          );
        })}
      </div>

      {/* If no orders are there to be fulfilled and so on.... */}
      {filteredOrder.length === 0 && delState === delOptions.pending && (
        <div className="w-full flex justify-center h-[500px] items-center text-2xl font-semibold text-gray-500">
          <p className="text-center">You have no pending deliveries!</p>
        </div>
      )}
      {filteredOrder.length === 0 && delState === delOptions.processed && (
        <div className="w-full flex justify-center h-[500px] items-center text-2xl font-semibold text-gray-500">
          <p className="text-center">No orders to be delivered!</p>
        </div>
      )}
      {filteredOrder.length === 0 && delState === delOptions.ofd && (
        <div className="w-full flex justify-center h-[500px] items-center text-2xl font-semibold text-gray-500">
          <p className="text-center">No orders are out for delivery!</p>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
