import React, { Component } from 'react';

import Header from '../components/Header';
import EditItem from '../components/EditItem';
import LoadingStyle from '../components/styles/LoadingStyle';

class MyItems extends Component {

    constructor(props) {
        super(props)

        this.state = {

            items: [],
            loading: true,

        }

        this.fetchData = this.fetchData.bind(this);

    }

    fetchData = () => {

        fetch(`${process.env.LOCALHOST}/auth/my-items`, {

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

            // mapping the items so that we can show them
            this.setState({ loading: false, items: resData.items.map(item => { 

                return (

                    /* we will use these props into the value of each inputs */
                    <EditItem title={item.title} description={item.description} img={item.image} price={item.price} key={item._id} itemId={item._id} stock={item.stock} />

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

            {this.state.loading && (<LoadingStyle>Loading...</LoadingStyle>)}

            {!this.state.loading && (
<>
                <h1 style={{ textAlign: 'center', color: 'green' }}>{this.state.items.length > 0 ? `You Have Created ${this.state.items.length} 
                Item${this.state.items.length > 1 ? 's' : ''}:` : 'You Did Not Create Any Item Yet'}</h1>

                <div>{this.state.items}</div>
</>
            )}
</>
        )

    }

}

export default MyItems;