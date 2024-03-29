import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BaseLayout from "../components/BaseLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import PageNotFound from "../pages/PageNotFound";
import EmailVerification from "../components/EmailVerification";
import Dashboard from "../pages/admin/Dashboard";
import AdminBaseLayout from "../components/admin/AdminBaseLayout";
import AddItem from "../pages/admin/AddProduct";
import ManageItem from "../pages/admin/ManageProduct";
import ProfilePage from "../pages/ProfilePage";
import UploadPrescriptionPage from "../pages/UploadPrescriptionPage";
import CartPage from "../pages/CartPage";
import IndividualProduct from "../pages/IndividualProduct";
import UpdateItem from "../pages/admin/UpdateItem";
import NotesPage from "../pages/NotesPage";
import ChatPage from "../pages/ChatPage";
import OrderPage from "../pages/OrderPage";
import FilterProductPage from "../pages/FilterProductPage";
import ManageOrder from "../pages/admin/ManageOrder";
import ManagePrescriptionOrders from "../pages/admin/ManagePrescriptionOrders";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import SearchPage from "../pages/SearchPage";
import PrescriptionOrderPage from "../pages/PrescriptionOrderPage";
import AdminProtectedRoutes from "./AdminProtectedRoutes";
import { getTokenFromLocalStorage } from "../utils/handleToken";
import axios from "axios";
import PasswordReset from "../pages/PasswordReset";
import DealsPage from "../pages/DealsPage";
import AdminChat from "../pages/admin/AdminChat";
import AdminPrivateChat from "../pages/admin/AdminPrivateChat";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/user/:id/verify/:token" element={<EmailVerification />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/password/reset/:userId/:token"
          element={<PasswordReset />}
        />

        <Route path="/" element={<BaseLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/products/:pname" element={<IndividualProduct />} />
          <Route path="/category/:type" element={<FilterProductPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search/:keyword" element={<SearchPage />} />
          <Route path="/deals/:deal" element={<DealsPage />} />
          <Route
            path="/upload-prescription"
            element={<UploadPrescriptionPage />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/my-medicines" element={<NotesPage />} />
          <Route
            path="/prescription-order"
            element={<PrescriptionOrderPage />}
          />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>

        <Route element={<AdminProtectedRoutes />}>
          <Route path="/admin" element={<AdminBaseLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/admin/add-product" element={<AddItem />} />
            <Route path="/admin/manage-product" element={<ManageItem />} />
            <Route
              path="/admin/manage-product/update/:id"
              element={<UpdateItem />}
            />
            <Route path="/admin/manage-order" element={<ManageOrder />} />
            <Route
              path="/admin/manage-prescription-order"
              element={<ManagePrescriptionOrders />}
            />
            <Route path="/admin/chat" element={<AdminChat />} />
            <Route path="/admin/chat/:id" element={<AdminPrivateChat />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
