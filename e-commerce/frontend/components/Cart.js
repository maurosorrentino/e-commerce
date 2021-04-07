import React, { Component } from 'react';

class Cart extends Component {

    constructor(props) {
        super(props)

        this.state = {

            items: [],

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

            this.setState({ items: resData.items.map(item => {

                return(
<>
                    <h1>title</h1>

                    <p>{item.title}</p>

                    <h1>price</h1>

                    <p>{item.price}</p>

                    <h1>quantity</h1>

                    <p>{item.quantity}</p>
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
            <h1>List Of The Items That You Have In Your Cart</h1>

            <div>{this.state.items}</div>
</>
        )

    }

};

export default Cart;