import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import ScrollToTop from "./component/scrollToTop";
import { ArrowToTop } from "./component/arrowToTop";
import { BackendURL } from "./component/backendURL";
import SelectedTypeContext from './TypeContext';
import { Home } from "./pages/home";
import { Signup } from "./pages/signup";
import { AboutUs } from "./pages/aboutus";
import { ContactUs } from "./pages/contactus";
import { Terms } from "./pages/terms";
import { ThanksMessage } from "./pages/thanksMessage";
import injectContext from "./store/appContext";
import { UserProvider } from './component/userContext';
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Chatbot_button } from "./component/chatbot_button";
import { Login } from "./pages/login"
import Product from "./pages/products";
import Profile from "./pages/profile";
import { NewPassword } from './pages/newPassword';
import {ResetPassword} from "./pages/resetPassword";
import ProductDetail from "./pages/product_detail";
import { ShoppingCart } from "./pages/shoppingCart";

const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    const [selectedType, setSelectedType] = useState('');
    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <UserProvider>
            <SelectedTypeContext.Provider value={{ selectedType, setSelectedType }}>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<AboutUs />} path="/aboutus" />
                        <Route element={<ContactUs />} path="/contactus" />
                        <Route element={<Terms />} path="/terms" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<ThanksMessage />} path="/thanksMessage" />
                        <Route element={<Product />} path="/products" />
                        <Route element={<ProductDetail />} path="/product/:id" />
                        <Route element={<Profile />} path="/profile" />
                        <Route element={<Profile/>} path="/profile/:orders/:id " />
                        <Route element={<ResetPassword />} path="/resetPassword" />
                        <Route element={<NewPassword/>} path="/newPassword" />
                        <Route element={<ShoppingCart/>} path="/shoppingCart" />
                        <Route element={<ShoppingCart/>} path="/shoppingCart/:orders/:id" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Chatbot_button />
                    <ArrowToTop />
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
            </SelectedTypeContext.Provider>
            </UserProvider>
        </div>
    );
};

export default injectContext(Layout);