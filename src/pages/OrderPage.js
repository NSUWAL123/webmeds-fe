import React from "react";
import ProtectedRoutes from "../routes/ProtectedRoutes";

const OrderPage = () => {
  window.scrollTo(0, 0);
  return (
    <div>
      <ProtectedRoutes />
      <p>OrderPage</p>
    </div>
  );
};

export default OrderPage;
