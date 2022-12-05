import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BaseLayout from "../components/BaseLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import PageNotFound from "../pages/PageNotFound";
import EmailVerification from "../components/EmailVerification";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/user/:id/verify/:token" element={<EmailVerification/>}/>

        <Route path="/" element={<BaseLayout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
