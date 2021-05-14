import React, { Component } from 'react';

class RemoveReview extends Component {

    state = {

        message: null,

    }

    fetchData = () => {

        const reviewId = this.props.reviewId;

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/api/remove-review/${reviewId}`, {

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

            if(this.state.message === 'review was removed') {

                setTimeout(() => {

                    window.location.replace(`/view-item/${this.props.itemId}`)
                    
                }, 1000);

            }

        })

        .catch(err => console.log(err));

    }

    render() {

        return (

            <button className="remove-review" onClick={this.fetchData} aria-label="remove review">X</button>

        )

    }

}

export default RemoveReview;