import NavStyle from './styles/NavStyles';
import Link from 'next/link';
import React from 'react';

export default function Nav() {

    return(

        <NavStyle>

            <Link id="shop-test" href="/">Shop</Link>

            <Link id="sell-test" href="/auth/sell">Sell</Link>

            <Link id="signup-test" href="/auth/signup">Signup</Link>

            <Link id="login-test" href="/auth/login">Login</Link>

            <Link href="/auth/logout">Logout</Link>

        </NavStyle>

    )

};