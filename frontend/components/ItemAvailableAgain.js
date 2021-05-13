import React, { Component } from 'react';
import cookie from 'react-cookies';

import MessageStyles from '../components/styles/MessageStyles';

class ItemAvailableAgain extends Component {

    state = {

        message: null,
        email: '',

    }

    // so here we handle the middleware if the user is signed in (if statement !req.session wasn't working properly so I came out with this solution)
    fetchDataLoggedIn = () => {

        const itemId = this.props.itemId;

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/email-me-item/${itemId}`, {

            method: 'PUT',

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

            this.setState({ message: resData.message });

        })

        .catch(err => console.log(err));

    }

    // here is the function where I only show the user the message please enter your email
    pleaseEnterYourEmail = () => {

        this.setState({ message: 'please enter your email' })

    }

    // so here we handle the middleware if the user is signed out (if statement !req.session wasn't working properly so I came out with this solution)
    fetchDataLoggedOut = () => {

        const itemId = this.props.itemId;

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/email-me-item-out/${itemId}`, {

            method: 'PUT',

            headers: {

                'Content-Type': 'application/json',
                'Accept': 'application/json',

            },

            credentials: 'include',

            body: JSON.stringify({

                email: this.state.email,

            })

        })

        .then(res => {

            return res.json();

        })

        .then(resData => {

            this.setState({ message: resData.message });

        })

        .catch(err => console.log(err));

    }

    handleChange = e => {

        this.setState({ email: e.target.value });

    }

    render() {

        return (
<>
            { cookie.load('authCookie') && (<button onClick={this.fetchDataLoggedIn}>Email Me When It Will Be Available Again!</button>)}

            { !cookie.load('authCookie') && (<button onClick={this.pleaseEnterYourEmail}>Email Me When It Will Be Available Again!</button>)}

            {this.state.message && (

                <MessageStyles><h1 className={this.state.message === 'you already requested a follow up email notification for this item' ? 
                'red' : ''}>{this.state.message}</h1></MessageStyles>

            )}

            {this.state.message === 'please enter your email' && (
<>
                <input

                    type="email"
                    name="email"
                    onChange={this.handleChange}
                    placeholder="enter your email"
                    value={this.state.email}

                />

                <button onClick={this.fetchDataLoggedOut} id="button-logged-out">Send Me An Email</button>
</>
            )}
</>
        )

    }

}

export default ItemAvailableAgain;