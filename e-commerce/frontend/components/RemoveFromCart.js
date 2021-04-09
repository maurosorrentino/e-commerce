import React, { Component } from 'react';

class RemoveFromCart extends Component {

    removeFromCart = () => {

        const itemId = this.props.itemId;

        fetch(`http://localhost:8090/auth/remove-from-cart/${itemId}`, {

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

            <button onClick={this.removeFromCart} aria-label="remove from cart">X</button>

        )

    }

}

export default RemoveFromCart;