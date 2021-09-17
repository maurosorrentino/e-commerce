import NavStyle from "./styles/NavStyles";
import Logout from "../components/Logout";

import Link from "next/link";
import React from "react";
import cookie from "react-cookies";
import { FaCog } from "react-icons/fa";

export default function Nav() { console.log("cookie.load(authCookie) ", cookie.load("authCookie"))
  return (
    <NavStyle>
      {cookie.load("authCookie") && (
        <Link id="sell-test" href="/auth/sell">
          <button>sell</button>
        </Link>
      )}

      {cookie.load("authCookie") && (
        <Link id="cart-test" href="/auth/cart">
          <button>cart</button>
        </Link>
      )}

      {cookie.load("authCookie") && (
        <Link id="my-item-test" href="/auth/my-items">
          <button>my items</button>
        </Link>
      )}

      {cookie.load("authCookie") && (
        <Link href="/auth/orders">
          <button>orders</button>
        </Link>
      )}

      {!cookie.load("authCookie") && (
        <Link id="signup-test" href="/auth/signup">
          <button>signup</button>
        </Link>
      )}

      {!cookie.load("authCookie") && (
        <Link id="login-test" href="/auth/login">
          <button>login</button>
        </Link>
      )}

      {cookie.load("authCookie") && <Logout />}

      {cookie.load("authCookie") && (
        <Link id="setting-test" href="/auth/settings">
          <button aria-label="settings">
            <FaCog />
          </button>
        </Link>
      )}
    </NavStyle>
  );
}