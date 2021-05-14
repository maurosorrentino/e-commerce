import React, { Component } from 'react';
import cookie from 'react-cookies';

import Header from '../components/Header';
import StyleOfItem from '../components/styles/StyleOfItem';
import LoadingStyle from '../components/styles/LoadingStyle';
import AddToCart from '../components/AddToCart';
import ReviewStats from '../components/ReviewStats';
import ItemAvailableAgain from '../components/ItemAvailableAgain';
import ViewItemStyle from '../components/styles/ViewItemStyle';

class ViewItem extends Component {

    constructor(props) {
        super(props)

        this.state = {

            loading: true,
            title: '',
            description: '',
            image: '',
            price: undefined,
            inStock: undefined,
            itemId: undefined,
            userId: null,

        }

        this.fetchDataLoggedIn = this.fetchDataLoggedIn.bind(this);
        this.fetchDataLoggedOut = this.fetchDataLoggedOut.bind(this);

    }

    // there are 2 middleware for showing the reviews because in the one where the user is logged in I send the userId so that we have a way to show the user the button "remove review"
    // if the review shown it's his
    fetchDataLoggedIn = () => {

        const itemId = this.props.itemId;

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/view-item-in/${itemId}`, {

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

            this.setState({ loading: false, title: resData.title, price: resData.price, 
                description: resData.description, image: resData.image, inStock: resData.stock, itemId: resData.itemId, userId: resData.userId });

        })

        .catch(err => console.log(err));

    }

    fetchDataLoggedOut = () => {

        const itemId = this.props.itemId;

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/view-item-out/${itemId}`, {

            method: 'GET',

            headers: {

                'Content-Type': 'application/json',
                'Accept': 'application/json',

            },

        })

        .then(res => {

            return res.json();

        })

        .then(resData => {

            this.setState({ loading: false, title: resData.title, price: resData.price, 
                description: resData.description, image: resData.image, inStock: resData.stock, itemId: resData.itemId });

        })

        .catch(err => console.log(err));

    }


    componentDidMount() {

        cookie.load('authCookie') && this.fetchDataLoggedIn();
        !cookie.load('authCookie') && this.fetchDataLoggedOut();

    }

    componentDidUpdate() {

        cookie.load('authCookie') && this.fetchDataLoggedIn();
        !cookie.load('authCookie') && this.fetchDataLoggedOut();

    }

    render() {

        return (
<>
            <Header />

            {this.state.loading && ( <LoadingStyle>Loading...</LoadingStyle> )}

            {!this.state.loading && (
<>
                <ViewItemStyle>

                    <StyleOfItem>

                        <h1>title</h1>
                        <p>{this.state.title}</p>

                        <img alt={this.state.title} src={this.state.image}></img>

                        <h1>description</h1>
                        <p>{this.state.description}</p>

                        <h1>price</h1>
                        <p>{Number(this.state.price).toFixed(2)} €</p>

                        <AddToCart inStock={this.state.inStock} itemId={this.props.itemId} />

                        {this.state.inStock <= 5 && this.state.inStock > 0 && (

                            <h1 className="few-left">only {this.state.inStock} left!!!</h1>

                        )}

                        {this.state.inStock === 0 && (

                            <ItemAvailableAgain itemId={this.state.itemId} />

                        )}

                    </StyleOfItem>

                </ViewItemStyle>

                {/* sending the user id so that we have a way to show the remove review button only if review is of the user */}
                <ReviewStats userId={this.state.userId} itemId={this.props.itemId} />
</>
            )}
</>
        )

    }

}

export default ViewItem;