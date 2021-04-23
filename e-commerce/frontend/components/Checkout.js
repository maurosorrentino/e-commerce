import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51HeLa7AY2cupxdbxV4hWNp3doOx930yt7seJyMhNViFtFQokc5h93RaJN4NljgNlcRc1f4rVUWQFFwTSzyWJZBzf00EkidN4To');

function Checkout() {

    const handleClick = async (e) => {

        // get stripe instance
        const stripe = await stripePromise;

        // calling API end point to create checkout session
        const res = await fetch(`http://localhost:8090/auth/create-checkout-session`, {

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