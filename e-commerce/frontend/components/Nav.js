import NavStyle from './styles/NavStyles';

import Link from 'next/link';
import React from 'react';
import cookie from 'react-cookies';

export default function Nav() {

    return(

        <NavStyle>

            <Link id="shop-test" href="/shop">Shop</Link>

            { cookie.load('authCookie') && <Link id="sell-test" href="/auth/sell">Sell</Link> }

            { !cookie.load('authCookie') && <Link id="signup-test" href="/auth/signup">Signup</Link> }

            { !cookie.load('authCookie') && <Link id="login-test" href="/auth/login">Login</Link> }

            { cookie.load('authCookie') && <Link href="/auth/logout">Logout</Link> }

        </NavStyle>

    )

};