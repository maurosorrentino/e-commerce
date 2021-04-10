import React, { Component } from 'react';

import StyleOfItem from '../components/styles/ItemStyles';
import Header from '../components/Header';
import ListOfItems from '../components/styles/ListOfItems';
import AddToCart from '../components/AddToCart';

class Shop extends Component {

    constructor(props) {
        super(props)

        this.state = {

            items: [],
    
        }    

        this.fetchData = this.fetchData.bind(this);

    }
 
    fetchData = () => {

        fetch(`http://localhost:8090/shop`, {

            method: 'GET',

            headers: {

                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },

        })

        .then(res => {

            return res.json();

        })

        .then(resData => {

            /* mapping the items that we are getting from the backend and setting them into state so that we can fetch them */
            this.setState({ items: resData.items.map(item => {

                return(
<>
                    <StyleOfItem key={item._id}>

                        <h1>title</h1>
                        <p>{item.title}</p>

                        <img alt={item.title} src={item.image}></img>

                        <h1>description</h1>
                        <p>{item.description}</p>

                        <h1>price</h1>
                        <p>{item.price}</p>

                        {/* assigning the item id as props so that we can access it from AddToCart component and make a call to the right API point */}
                        <AddToCart itemId={item._id} />
                    
                    </StyleOfItem>
</>
                )

            }) });

        })

        .catch(err => {

            console.log(err);

        })

    } 

    componentDidMount() {

        this.fetchData();

    }

    render() {

        return(
<>
            <Header />

            <ListOfItems>{this.state.items}</ListOfItems>
</>
        )

    }

};

export default Shop;