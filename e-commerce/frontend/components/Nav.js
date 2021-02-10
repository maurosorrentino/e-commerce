import NavStyle from './styles/NavStyles';
import Link from 'next/link';

export default function Nav() {

    return(

        <NavStyle>

            <Link passHref href="/">Shop</Link>

            <Link passHref href="/sell">Sell</Link>

            <Link passHref href="/auth/signup">Signup</Link>

            <Link passHref href="/login">Login</Link>

        </NavStyle>

    )

};