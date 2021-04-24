import React, { Component } from 'react';

import Header from '../components/Header';
import StyleOfItem from '../components/styles/StyleOfItem';
import LoadingStyle from '../components/styles/LoadingStyle';
import MessageStyles from '../components/styles/MessageStyles';
import AddToCart from '../components/AddToCart';

class ViewItem extends Component {

    constructor(props) {
        super(props)

        this.state = {

            loading: true,
            title: '',
            description: '',
            image: '',
            price: undefined,
            message: null,

        }

        this.fetchData = this.fetchData.bind(this);

    }

    fetchData = () => {

        const itemId = this.props.itemId;

        fetch(`http://localhost:8090/view-item/${itemId}`, {

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

            this.setState({ loading: false, title: resData.title, price: resData.price, description: resData.description, image: resData.image });

        })

        .catch(err => console.log(err));

    }

    componentDidMount() {

        this.fetchData();

    }

    componentDidUpdate() {

        this.fetchData();

    }

    render() {

        return (
<>
            <Header />

            {this.state.loading && ( <LoadingStyle>Loading...</LoadingStyle> )}

            {this.state.message && ( <MessageStyles><h1>{this.state.message}</h1></MessageStyles> )}

            {!this.state.loading && (

                <StyleOfItem>

                    <h1>title</h1>
                    <p>{this.state.title}</p>

                    <img alt={this.state.title} src={this.state.image}></img>

                    <h1>description</h1>
                    <p>{this.state.description}</p>

                    <h1>price</h1>
                    <p>{this.state.price} €</p>

                    <AddToCart itemId={this.props.itemId} />

                </StyleOfItem>

            )}
</>
        )

    }

}

export default ViewItem;