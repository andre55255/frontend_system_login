import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Login from '../pages/login/Login';
import Products from '../pages/crudProducts/Products';
import Register from '../pages/register/Register';
import ForgotPasswordStepOne from '../pages/forgotPasswordStepOne/ForgotPasswordStepOne';
import ForgotPasswordStepTwo from '../pages/forgotPasswordStepTwo/ForgotPasswordStepTwo';
import AllProducts from '../pages/allProducts/AllProducts';

const Router = (props) => (
    <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/products" element={<Products />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/oneForgotPassword" element={<ForgotPasswordStepOne/>}/>
        <Route path="/twoForgotPassword" element={<ForgotPasswordStepTwo />}/>
        <Route path="/allProducts" element={<AllProducts/>}/>
        <Route path="*" element={<h1>Page Not Found - 404</h1>}/>
    </Routes>
);

export default Router;