import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';

import Header from '../components/Header';
import CartStyle from '../components/styles/CartStyle';
import RemoveFromCart from '../components/RemoveFromCart';

class Cart extends Component {

    constructor(props) {
        super(props)

        this.state = {

            items: [],
            total: undefined,
            email: '',

        }

        this.fetchData = this.fetchData.bind(this);

    }

    onToken = (token) => {

        fetch('/save-stripe-token', {

          method: 'POST',
          body: JSON.stringify(token),

        })
        
        .then(response => {

          response.json().then(data => {

            alert(`We are in business, ${data.email}`);

          });

        });

      }

    fetchData = () => {

        fetch(`http://localhost:8090/auth/cart`, {

            method: 'GET',

            headers: {

                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },

            credentials: 'include',

        })

        .then(res => {
            
            return res.json()
        
        })

        .then(resData => {

            /* mapping the items that we are getting from the backend and setting them into state so that we can fetch them */
            this.setState({ email: resData.email, total: resData.total, items: resData.items.map(item => {

                return(
<>
                    <ul>

                        <li key={item.itemId}>

                            <h1>Title:</h1>

                            <p>{item.title}</p>

                            <h1>Price:</h1>

                            <p>{item.price} €</p>

                            <h1>Quantity:</h1>

                            <p>{item.quantity}</p>

                            {/* assigning the item id as props so that we can access it from RemoveFromCart component and make a call to the right API point */}
                            <RemoveFromCart itemId={item.itemId} />

                        </li>

                    </ul>
</>
                )
                
            }) })

        })

        .catch(err => console.log(err))

    }

    componentDidMount() {

        this.fetchData();

    }

    render() {

        return(
<>
            <Header />

            {this.state.items.length > 0 && (

                <CartStyle>

                    <h1>List Of The Items That You Have In Your Cart:</h1>
                    
                    {this.state.items}

                    <h1>Total:</h1>
                    
                    <p>{this.state.total} €</p>

                    <button onClick={this.checkToken} id="checkoutButton">
                        
                        <StripeCheckout

                            name="My Shop"
                            stripeKey="pk_test_51HeLa7AY2cupxdbxV4hWNp3doOx930yt7seJyMhNViFtFQokc5h93RaJN4NljgNlcRc1f4rVUWQFFwTSzyWJZBzf00EkidN4To"
                            amount={this.state.total * 100}
                            currency="EUR"
                            email={this.state.email}
                            description={`Order Of ${this.state.items.length} Item${this.state.items.length > 1 ? 's' : ''}`}
                            billingAddress={true}
                            shippingAddress={true}
                            label="Checkout"
                            token={this.onToken}

                        />
                    
                    </button>
                    
                </CartStyle>

            )}

            {this.state.items.length === 0 && (

                <CartStyle>

                    <h1>You Don't Have Any Items In Your Cart</h1>

                </CartStyle>

            )}
</>
        )

    }

};

export default Cart;