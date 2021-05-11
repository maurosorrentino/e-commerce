import React, { Component } from 'react';
import cookie from 'react-cookies';

class RemoveFromCart extends Component {

    removeFromCart = () => {

        const itemId = this.props.itemId;

        fetch(`${window.location.host}:8090/auth/remove-from-cart/${itemId}`, {

            method: 'PATCH',

            headers: {

                'Content-Type': 'application/json',
                'Accept': 'application/json',

            },

            credentials: 'include',

        })

        .then(() => {

            /* staying on the same page */
            return window.location.replace('/auth/cart')

        })

        .catch(err => console.log(err));

    }

    render() {

        return(

<>
            <form encType="multipart/form-data">

                {/* checking presents of cookies (we also check on the backend the values) */}
                <input type="hidden" name="cookie" value={cookie.load('connect.sid')} />
                <input type="hidden" name="XSRF-TOKEN" value={cookie.load('token')} />
                <input type="hidden" name="authCookie" value={cookie.load('authCookie')} />

                <button onClick={this.removeFromCart} aria-label="remove from cart">X</button>

            </form>
</>

        )

    }

}

export default RemoveFromCart;