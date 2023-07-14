import React, {useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './LandingPage'
import LoginPage from './login/LoginPage'
import RegisterPage from './login/RegisterPage'
import ForgetPasswordPage from './login/ForgetPasswordPage'
import HomePage from './HomePage'
import Report from './report/Report'
import AccountSetting from './profile/AccountSetting'
import Toggle from './shop/Toggle'
import CheckOut from './shop/checkout/CreateOrder'
import OrderCompleted from './shop/orderComplete/orderCompleted'
import Testing1 from './testing1'
import PendingAccount from './login/PendingAccount'
import CheckoutForm from './shop/orderComplete/checkoutform';


import '../App.css'
import "bootstrap/dist/css/bootstrap.css";

export default function App() {
    const [info, setInfo] = useState({})
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/:userid" element={<HomePage/>}/>
                    <Route path="/" element={ <LandingPage/> } />
                    <Route path="/login" element={ <LoginPage/> } setInfo = {setInfo}/>
                    <Route path="/register" element={ <RegisterPage/> } />
                    <Route path="/forget-password" element={ <ForgetPasswordPage/> } />
                    <Route path="/home" element={ <HomePage/> } />
                    <Route path="/report" element={ <Report/> } />
                    <Route path="/checkoutform" element={ <CheckoutForm/> } />
                    <Route path="/account-setting" element={ <AccountSetting/> } />
                    <Route path="/shop" element={ <Toggle/> } info = {info}/>
                    <Route path="/cart" element={<CheckOut/>}/>
                    <Route path="/ordercompleted" element={<OrderCompleted/>}/>
                    <Route path="/test" element={ <Testing1/> } />
                    <Route path="/accountmanagement" element={ <PendingAccount/> } />
                </Routes>
            </div>
        </Router>
    )
};
