import React, { Component } from 'react';
import cookie from 'react-cookies';

class RemoveItem extends Component {

    state = {

        loading: false,

    }

    removeItem = () => {

        this.setState({ loading: true });

        const itemId = this.props.itemId;

        fetch(`http://localhost:8090/auth/remove-item/${itemId}`, {

            method: 'DELETE',

            headers: {

                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },

            credentials: 'include',

        })

        .then(() => {

            /* staying on the same page */
            return window.location.replace('/auth/my-items');

        })

        .catch(err => console.log(err));

    }

    render() {

        return (

            <form encType="multipart/form-data">

                {/* checking presents of cookies (we also check on the backend the values) */}
                <input type="hidden" name="cookie" value={cookie.load('connect.sid')} />
                <input type="hidden" name="XSRF-TOKEN" value={cookie.load('token')} />
                <input type="hidden" name="authCookie" value={cookie.load('authCookie')} />

                <button onClick={this.removeItem} style={{ marginTop: '1rem' }}>Remov{this.state.loading ? 'ing' : 'e'}</button>

            </form>

        ) 

    }

}

export default RemoveItem;