import React, { Component } from 'react';

import Header from '../components/Header';
import CartStyle from '../components/styles/CartStyle';
import RemoveFromCart from '../components/RemoveFromCart';

class Cart extends Component {

    constructor(props) {
        super(props)

        this.state = {

            items: [],
            total: undefined,

        }

        this.fetchData = this.fetchData.bind(this);

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
            this.setState({ total: resData.total, items: resData.items.map(item => {

                return(
<>
                    <ul>

                        <li key={item.itemId}>

                            <h1>Title:</h1>

                            <p>{item.title}</p>

                            <h1>Price:</h1>

                            <p>{item.price}</p>

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
<>

                <CartStyle>

                    <h1>List Of The Items That You Have In Your Cart:</h1>
                    
                    {this.state.items}

                    <h1>Total:</h1>
                    
                    <p>{this.state.total}</p>
                    
                </CartStyle>
</>
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