import React, { Component } from 'react';

import Header from '../components/Header';
import EditItem from '../components/EditItem';

class MyItems extends Component {

    constructor(props) {
        super(props)

        this.state = {

            items: [],
            showComponent: false,

        }

        this.fetchData = this.fetchData.bind(this);

    }

    fetchData = () => {

        fetch(`http://localhost:8090/auth/my-items`, {

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

            this.setState({ items: resData.items.map(item => { 

                return (

                    /* we will use these props into the value of each inputs */
                    <EditItem title={item.title} description={item.description} img={item.image} price={item.price} key={item._id} itemId={item._id} />

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

            <h1 style={{ textAlign: 'center', color: 'green' }}>{this.state.items.length > 0 ? 'List Of Items That You Have Created:' : 'You Did Not Create Any Item Yet'}</h1>

            <div>{this.state.items}</div>
</>
        )

    }

}

export default MyItems;