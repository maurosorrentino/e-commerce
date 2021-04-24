import React, { Component } from 'react';

import OrderStyle from '../components/styles/OrderStyle';
import Header from '../components/Header';
import StyleOfItem from '../components/styles/StyleOfItem';

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

        .then(resData => { console.log(resData.orders)

            this.setState({ loading: false, orders: resData.orders.map(order => {

                return (

                    <>
                        <ul key={order._id}>

                            <h1 className="black">Order id: {order._id}</h1>

                            <li className="order">
                                
                                {order.items.map(item => {

                                    return (

                                        <>

                                            <ul key={item.itemId} className="item">

                                                <li>

                                                    <h1>Title:</h1>

                                                    <p>{item.title}</p>

                                                    <h1>Price:</h1>

                                                    <p>{item.price} €</p>

                                                    <h1>Quantity:</h1>

                                                    <p>{item.quantity}</p>


                                                </li>

                                            </ul>

                                        </>
                                    )

                                })}

                                <h1>Total: {order.total} €</h1>
                                
                            </li>

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

            <OrderStyle>{this.state.orders}</OrderStyle>
</>
        )

    }

}

export default Order;