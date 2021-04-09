import React, { Component } from 'react';
import cookie from 'react-cookies';

class AddToCart extends Component {

    addToCart = () => {

        const itemId = this.props.itemId;

        fetch(`http://localhost:8090/auth/add-to-cart/${itemId}`, {

            method: 'PATCH',

            headers: {

                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },

            credentials: 'include',

        })

        .then(() => { 

            /* staying on the same page */
            return window.location.replace('/shop');

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

                <button onClick={this.addToCart}>Add To Cart</button>

            </form>
</>
        )

    }

}

export default AddToCart;