import React, { Component } from 'react';

import { FaStar } from 'react-icons/fa';
import ViewReviewStyle from '../components/styles/ViewReviewStyle';

class ViewReview extends Component {

    constructor(props) {
        super(props) 

            this.state = {

                reviews: [],
        
            }

        this.fetchData = this.fetchData.bind(this);

    }

    fetchData = () => {

        const itemId = this.props.itemId;

        fetch(`http://localhost:8090/view-review/${itemId}`, {

            method: 'GET',

            headers: {

                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },

        })

        .then(res => {

            return res.json()

        })

        .then(resData => {

            this.setState({ reviews: resData.reviews.map(review => {

                let reviewRating;

                /* making the number (rating) stars */
                if(review.rating === 5) {

                    reviewRating = <> <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar /> </> 

                }

                if(review.rating === 4) {

                    reviewRating = <> <FaStar /> <FaStar /> <FaStar /> <FaStar /> </> 

                }

                if(review.rating === 3) {

                    reviewRating = <> <FaStar /> <FaStar /> <FaStar /> </> 

                }

                if(review.rating === 2) {

                    reviewRating = <> <FaStar /> <FaStar /> </> 

                }

                if(review.rating === 1) {

                    reviewRating = <> <FaStar /> </> 

                }

                return (

                    <ViewReviewStyle key={review._id}>
                        
                        <span className="orange">{reviewRating}</span>
                        <h1>{review.text}</h1>

                    </ViewReviewStyle>

                )

            }) })

        })

        .catch(err => console.log(err));

    }

    componentDidMount() {

        this.fetchData();

    }

    render() {

        return(

            <div>

                {this.state.reviews.length === 0 && <h1>there are no reviews for this item</h1>}

                {this.state.reviews.length >= 1 && <h1>review{this.state.reviews.length > 1 ? 's' : ''} of this item:</h1> }
                
                {this.state.reviews}
                
            </div>

        )

    }

}

export default ViewReview;