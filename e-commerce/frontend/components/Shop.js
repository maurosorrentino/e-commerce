import React, { Component } from 'react';

import ItemStyle from '../components/styles/ItemStyles';
import Header from '../components/Header';
import ItemsList from '../components/styles/ItemList';

class Shop extends Component {

    constructor(props) {
        super(props)

        this.state = {

            items: [],
    
        }    

        this.fetchData = this.fetchData.bind(this);

    }
 
    fetchData = async () => {

        await fetch(`http://localhost:8090/shop`, {

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

            this.setState({ items: resData.items.map(item => {

                return(
<>
                    <ItemStyle>

                        <h1>title</h1>
                        <p>{item.title}</p>

                        <img alt={item.title} src={item.image}></img>

                        <h1>description</h1>
                        <p>{item.description}</p>

                        <h1>price</h1>
                        <p>{item.price}</p>
                    
                    </ItemStyle>
</>
                )

            }) });

        })

        .catch(err => {

            console.log(err);

        })

    } 

    async componentDidMount() {

        await this.fetchData();

    }

    render() {

        return(
<>
            <Header />

            <ItemsList>{this.state.items}</ItemsList>
</>
        )

    }

};

export default Shop;