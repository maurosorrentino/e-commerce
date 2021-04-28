import React, { Component } from 'react';

import MessageStyles from '../components/styles/MessageStyles'

class RemoveReview extends Component {

    state = {

        message: null,

    }

    fetchData = () => {

        const reviewId = this.props.reviewId;

        fetch(`http://localhost:8090/auth/remove-review/${reviewId}`, {

            method: 'DELETE',

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

        .then(() => {

            if(this.state.message === 'review was removed, you are being redirected to the same page') {

                setTimeout(() => {

                    window.location.replace(`/view-item/${this.props.itemId}`)
                    
                }, 3000);

            }

        })

        .catch(err => console.log(err));

    }

    render() {

        return (
<>
            {this.state.message && <MessageStyles><h1>{this.state.message}</h1></MessageStyles>}

            <button className="remove-review" onClick={this.fetchData} aria-label="remove review">X</button>
</>
        )

    }

}

export default RemoveReview;