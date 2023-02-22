import React from "react";
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
import NotificationPage from "../pages/NotificationPage";
import ChatPage from "../pages/ChatPage";
import OrderPage from "../pages/OrderPage";
import FilterProductPage from "../pages/FilterProductPage";
import ManageOrder from "../pages/admin/ManageOrder";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/user/:id/verify/:token" element={<EmailVerification/>}/>

        <Route path="/" element={<BaseLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/products/:pname" element={<IndividualProduct/>}/>
          <Route path="/category/:type" element={<FilterProductPage/>}/>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/upload-prescription" element={<UploadPrescriptionPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>

        <Route path="/admin" element={<AdminBaseLayout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path="/admin/add-product" element={<AddItem/>}/>
          <Route path="/admin/manage-product" element={<ManageItem/>}/>
          <Route path="/admin/manage-product/update/:id" element={<UpdateItem/>}/>
          <Route path="/admin/manage-order" element={<ManageOrder/>}/>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
