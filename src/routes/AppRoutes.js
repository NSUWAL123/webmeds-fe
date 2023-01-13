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

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/user/:id/verify/:token" element={<EmailVerification/>}/>
        

        <Route path="/" element={<BaseLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/upload-prescription" element={<UploadPrescriptionPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>

        <Route path="/admin" element={<AdminBaseLayout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path="/admin/add-product" element={<AddItem/>}/>
          <Route path="/admin/manage-product" element={<ManageItem/>}/>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
