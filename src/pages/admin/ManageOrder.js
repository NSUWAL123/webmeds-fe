import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Order from "../../components/admin/order/Order";
import { populateAdminOrder } from "../../redux/adminOrderSlice";

const ManageOrder = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.adminOrder);

  //four different delivery states
  const delOptions = {
    pending: "pending",
    processed: "processed",
    ofd: "ofd",
    delivered: "delivered",
  };
  const [delState, setDelState] = useState(delOptions.pending);
  const filteredOrder = orders.filter(
    (order) => order.deliveryStatus === delState
  );

  useEffect(() => {
    (async () => {
      let response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/order/getAllOrders`
      );
      let { data } = response;
      dispatch(populateAdminOrder(data));
    })();
  }, []);

  return (
    <div>
      <div className="w-full">
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
          To be Delivered
        </button>
        <button
          className={`${
            delState === delOptions.ofd
              ? "bg-[#5D94E7] border-[#5D94E7] text-white"
              : "bg-white text-gray-500 border-gray-400"
          }  px-1 py-1  border-[2px] `}
          onClick={() => setDelState(delOptions.ofd)}
        >
          Out for Delivery
        </button>
      </div>
      <div>
        {filteredOrder.map((order) => {
          return (
            <>
              {order.failed === false && (
                <Order
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
          <p className="text-center">No pending deliveries!</p>
        </div>
      )}
      {filteredOrder.length === 0 && delState === delOptions.processed && (
        <div className="w-full flex justify-center h-[500px] items-center text-2xl font-semibold text-gray-500">
          <p className="text-center">No orders for processing!</p>
        </div>
      )}
      {filteredOrder.length === 0 && delState === delOptions.ofd && (
        <div className="w-full flex justify-center h-[500px] items-center text-2xl font-semibold text-gray-500">
          <p className="text-center">No orders yet to recieve!</p>
        </div>
      )}
      {filteredOrder.length === 0 && delState === delOptions.delivered && (
        <div className="w-full flex justify-center h-[500px] items-center text-2xl font-semibold text-gray-500">
          <p className="text-center">You haven't purchased any products yet!</p>
        </div>
      )}
    </div>
  );
};

export default ManageOrder;
