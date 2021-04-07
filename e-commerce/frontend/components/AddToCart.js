import React, { Component } from 'react';

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

            <form encType="application/x-www-form-urlencoded">

                <input type="hidden" name="itemId" value={this.props.itemId} />

                <button onClick={this.addToCart}>Add To Cart</button>

            </form>

        )

    }

}

export default AddToCart;