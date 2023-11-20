import React, {useState, useEffect} from 'react'
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
import Management from './shop/Management'
import PriceManagement from './shop/priceManagement'

export default function App() {
    useEffect(() => {
        // LiveChat script
        window.__lc = window.__lc || {};
        window.__lc.license = 16678152;

        (function (n, t, c) {
            function i(n) {
                return e._h ? e._h.apply(null, n) : e._q.push(n);
            }
            var e = {
                _q: [],
                _h: null,
                _v: '2.0',
                on: function () {
                    i(['on', c.call(arguments)]);
                },
                once: function () {
                    i(['once', c.call(arguments)]);
                },
                off: function () {
                    i(['off', c.call(arguments)]);
                },
                get: function () {
                    if (!e._h) throw new Error("[LiveChatWidget] You can't use getters before load.");
                    return i(['get', c.call(arguments)]);
                },
                call: function () {
                    i(['call', c.call(arguments)]);
                },
                init: function () {
                    var n = t.createElement('script');
                    n.async = !0;
                    n.type = 'text/javascript';
                    n.src = 'https://cdn.livechatinc.com/tracking.js';
                    t.head.appendChild(n);
                },
            };

            !n.__lc.asyncInit && e.init();
            n.LiveChatWidget = n.LiveChatWidget || e;
        })(window, document, [].slice);
    }, []);
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
                    <Route path="/management" element={ <Management/> } />
                    <Route path="/price_management" element={ <PriceManagement/> } />

                </Routes>
                <noscript>
                <a href="https://www.livechat.com/chat-with/16678152/" rel="nofollow">Chat with us</a>, powered by <a href="https://www.livechat.com/?welcome" rel="noopener nofollow" target="_blank">LiveChat</a>
            </noscript>
            </div>
        </Router>
    )
};
