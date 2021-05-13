import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.STRIPE);

function Checkout() {

    const handleClick = async (e) => {

        // get stripe instance
        const stripe = await stripePromise;

        // calling API end point to create checkout session
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/api/create-checkout-session`, {

            method: 'POST',

            headers: {

                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },

            credentials: 'include',

        });

        const session = await res.json();
 
        // when user clicks on the button we redirect to the checkout page
        const result = await stripe.redirectToCheckout({

            sessionId: session.id,

        });

        if(result.error) {

            console.log(result.error);

        } 

    };

    return <button id="checkoutButton" onClick={handleClick}>checkout</button>

}

export default Checkout;