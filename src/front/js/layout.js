import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Signup } from "./pages/signup";
import { Terms } from "./pages/terms";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Login from "./pages/login"
import Product from "./pages/products";
import Profile from "./pages/profile";
import ResetPassword from "./pages/resetPassword";
import ProductDetail from "./pages/product_detail";
import ProfileRedirect from './component/ProfileRedirect';
import { ShoppingCart } from "./pages/shoppingCart";

const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Terms />} path="/terms" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<ProfileRedirect />} path="/profile" />
                        <Route element={<Product />} path="/bicycles" />
                        <Route element={<ProductDetail />} path="/product/:id" />
                        <Route element={<Profile />} path="/profile" />
                        <Route element={<Profile/>} path="/profile/:orders/:id " />
                        <Route element={<ResetPassword />} path="/reset" />
                        <Route element={<ResetPassword/>} path="/resetPassword/:id" />
                        <Route element={<ShoppingCart/>} path="/shoppingCart" />
                        <Route element={<ShoppingCart/>} path="/shoppingCart/:orders/:id" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
