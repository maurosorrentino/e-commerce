import NavStyle from './styles/NavStyles';
import Logout from '../components/Logout';

import Link from 'next/link';
import React from 'react';
import cookie from 'react-cookies';
import { FaCog } from 'react-icons/fa';

export default function Nav() {

    return(

        <NavStyle>

            { cookie.load('authCookie') && <Link id="sell-test" href="/auth/sell">sell</Link> }

            { cookie.load('authCookie') && <Link id="cart-test" href="/auth/cart">cart</Link>}

            { cookie.load('authCookie') && <Link id="my-item-test" href="/auth/my-items">my items</Link> }

            { cookie.load('authCookie') && <Link href="/auth/orders">orders</Link> }

            { !cookie.load('authCookie') && <Link id="signup-test" href="/auth/signup">signup</Link> }

            { !cookie.load('authCookie') && <Link id="login-test" href="/auth/login">login</Link> }

            { cookie.load('authCookie') && <Logout /> }

            { cookie.load('authCookie') && <Link id="setting-test" href="/auth/settings"><button><FaCog /></button></Link> }

        </NavStyle>

    )

};