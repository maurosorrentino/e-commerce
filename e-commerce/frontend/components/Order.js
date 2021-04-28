import React, { Component } from 'react';

import OrderStyle from '../components/styles/OrderStyle';
import Header from '../components/Header';
import LoadingStyle from '../components/styles/LoadingStyle';

class Order extends Component {

    constructor(props) {
        super(props)

        this.state = {
            
            orders: [],
            loading: true,
    
        }

        this.fetchData = this.fetchData.bind(this);

    }

    fetchData = () => {

        fetch(`http://localhost:8090/auth/orders`, {


            method: 'GET',

            headers: {

                'Content-Type': 'application/json',
                'Accept': 'application/json',

            },

            credentials: 'include',

        })

        .then(res => {

            return res.json();

        })

        .then(resData => { 

            // mapping the orders so that we can show them
            this.setState({ loading: false, orders: resData.orders.map(order => {

                return (

                    <>
                        <ul key={order._id}>

                            <h1 id="order-id-total">Order id: {order._id}</h1>

                            <li className="order">
                                
                                {order.items.map(item => {

                                    return (

                                        <>

                                            <ul key={item.itemId} className="item">

                                                <li>

                                                    <h1>Title:</h1>

                                                    <p>{item.title}</p>

                                                    <h1>Price:</h1>

                                                    <p>{Number(item.price).toFixed(2)} €</p>

                                                    <h1>Quantity:</h1>

                                                    <p>{item.quantity}</p>


                                                </li>

                                            </ul>

                                        </>
                                    )

                                })}
                                
                            </li>

                            <h1 id="order-id-total">Total: {Number(order.total).toFixed(2)} €</h1>

                        </ul>

                    </>

                )

            }) })

        })

        .catch(err => console.log(err));

    }

    componentDidMount() {

        this.fetchData();

    }

    render() {

        return (
<>

            <Header />

            {this.state.loading && (<LoadingStyle>Loading...</LoadingStyle>) }

            {this.state.orders.length === 0 && !this.state.loading && (
            
                <OrderStyle>

                    <h1>you did not order anything yet.</h1>

                </OrderStyle>) }

            {!this.state.loading && (<OrderStyle>{this.state.orders}</OrderStyle>) }
</>
        )

    }

}

export default Order;