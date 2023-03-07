import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import khaltilogo from ".././pictures/logo/khaltilogo.png";

const UserOrder = (props) => {
  const { delState, delOptions, order } = props;
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const orderLine = order.orderLine;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  useEffect(() => {
    (async () => {
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

  return (
    <div className="bg-[#ffffff] px-5 w-full py-2 my-4 rounded-md max-w-[800px]">
      <p className="text-gray-500 text-sm">
        Placed on: {order.date.split("T")[0]}
      </p>
      <div className="border-b-[1px] border-gray-300 flex justify-between items-center">
        {/* looping products */}
        <div>
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
        {order.paymentType === "khalti" ? (
          <div className="flex items-center">
            <p className="text-gray-400 font-medium text-sm">Paid via </p>
            <img src={khaltilogo} alt="" className="w-[60px]" />
          </div>
        ) : (
          <p className="text-gray-400 font-medium text-sm">
            {order.deliveryStatus === "delivered" ? (
              <>Paid via COD</>
            ) : (
              <>COD</>
            )}
          </p>
        )}
      </div>

      <div className="h-[40px] flex flex-col justify-around">
        <div className="flex justify-between">
          <p className="font-semibold">Items: {order.totalItems}</p>
          <p className="font-semibold text-[#E25247]">
            Total: {order.grandTotal}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserOrder;
