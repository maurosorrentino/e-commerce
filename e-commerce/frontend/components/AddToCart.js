import React, { Component } from 'react';
import cookie from 'react-cookies';

import MessageStyles from '../components/styles/MessageStyles';

class AddToCart extends Component {

    state = {

        message: null,

    }

    addToCart = () => {

        const itemId = this.props.itemId;

        fetch(`http://localhost:8090/auth/add-to-cart/${itemId}`, {

            method: 'PATCH',

            headers: {

                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },

            credentials: 'include',

        })

        .then(res => {

            return res.json();

        })

        .then(resData => {  

            this.setState({ message: resData.message });

        })

        .catch(err => console.log(err));

    }

    // preventing page from refreshing so that we can tell the user how many items we have in stock (and also that they have to login if they haven't done it yet)
    handleSubmit = e => {

        e.preventDefault();

    }

    render() {

        const disabled = this.props.inStock === 0;

        return(

<>
            <form onSubmit={this.handleSubmit} encType="multipart/form-data">

                {/* checking presents of cookies (we also check on the backend the values) */}
                <input type="hidden" name="cookie" value={cookie.load('connect.sid')} />
                <input type="hidden" name="XSRF-TOKEN" value={cookie.load('token')} />
                <input type="hidden" name="authCookie" value={cookie.load('authCookie')} />

                <button disabled={disabled} onClick={this.addToCart}>Add To Cart</button>

                {this.state.message && (

                    <MessageStyles><h1 className={this.state.message === `we only have ${(this.props.inStock)} left into the store` ? 
                    'red' : ''}>{this.state.message}</h1></MessageStyles>

                )}

            </form>
</>
        )

    }

}

export default AddToCart;