import React, { Component } from 'react';
import { FaStar } from 'react-icons/fa';

import MessageStyles from '../components/styles/MessageStyles';
import ViewReview from '../components/ViewReview';
import WriteReviewStyle from '../components/styles/WriteReviewStyle';

class WriteReview extends Component {

    state = {

        review: '',
        message: null,
        handleRatingValue: null,

    }

    handleChange = e => {

        this.setState({ review: e.target.value });

    }

    fetchData = () => {

        const itemId = this.props.itemId;

        fetch(`http://localhost:8090/auth/write-review/${itemId}`, {

            method: 'PUT',

            headers: {

                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },

            credentials: 'include',

            body: JSON.stringify({

                review: this.state.review,
                star: this.state.handleRatingValue,

            })

        })

        .then(res => {

            return res.json();

        })

        .then(resData => {

            {/* putting the user id into state so that we have a way to show the remove review button only if review is of the user */}
            this.setState({ message: resData.message, userId: resData.userId });

        })

        .catch(err => console.log(err));

    }

    // handling the color of the start rating when the user put the mouse over, mouse leave and clicks on it
    handleRating = () => {

        const rating5 = document.getElementById("rating-5");
        const rating4 = document.getElementById("rating-4");
        const rating3 = document.getElementById("rating-3");
        const rating2 = document.getElementById("rating-2");
        const rating1 = document.getElementById("rating-1");

        // mouse over
        rating5.addEventListener("mouseover", e => {

            rating5.classList.add("orange");
            rating4.classList.add("orange");
            rating3.classList.add("orange");
            rating2.classList.add("orange");
            rating1.classList.add("orange");

        });

        rating4.addEventListener("mouseover", e => {

            rating4.classList.add("orange");
            rating3.classList.add("orange");
            rating2.classList.add("orange");
            rating1.classList.add("orange");

        });

        rating3.addEventListener("mouseover", e => {

            rating3.classList.add("orange");
            rating2.classList.add("orange");
            rating1.classList.add("orange");

        });

        rating2.addEventListener("mouseover", e => {

            rating2.classList.add("orange");
            rating1.classList.add("orange");

        });

        rating1.addEventListener("mouseover", e => {

            rating1.classList.add("orange");

        });

        // mouse leave
        rating5.addEventListener("mouseleave", e => {

            rating5.classList.remove("orange");
            rating4.classList.remove("orange");
            rating3.classList.remove("orange");
            rating2.classList.remove("orange");
            rating1.classList.remove("orange");

        });

        rating4.addEventListener("mouseleave", e => {

            rating4.classList.remove("orange");
            rating3.classList.remove("orange");
            rating2.classList.remove("orange");
            rating1.classList.remove("orange");

        });

        rating3.addEventListener("mouseleave", e => {

            rating3.classList.remove("orange");
            rating2.classList.remove("orange");
            rating1.classList.remove("orange");

        });

        rating2.addEventListener("mouseleave", e => {

            rating2.classList.remove("orange");
            rating1.classList.remove("orange");

        });

        rating1.addEventListener("mouseleave", e => {

            rating1.classList.remove("orange");

        });

        rating5.addEventListener("click", e => {

            rating5.classList.add("orange2");
            rating4.classList.add("orange2");
            rating3.classList.add("orange2");
            rating2.classList.add("orange2");
            rating1.classList.add("orange2");

        });

        rating4.addEventListener("click", e => {

            rating5.classList.remove("orange2");
            rating4.classList.add("orange2");
            rating3.classList.add("orange2");
            rating2.classList.add("orange2");
            rating1.classList.add("orange2");

        });

        rating3.addEventListener("click", e => {

            rating5.classList.remove("orange2");
            rating4.classList.remove("orange2");
            rating3.classList.add("orange2");
            rating2.classList.add("orange2");
            rating1.classList.add("orange2");

        });

        rating2.addEventListener("click", e => {

            rating5.classList.remove("orange2");
            rating4.classList.remove("orange2");
            rating3.classList.remove("orange2");
            rating2.classList.add("orange2");
            rating1.classList.add("orange2");

        });

        rating1.addEventListener("click", e => {

            rating5.classList.remove("orange2");
            rating4.classList.remove("orange2");
            rating3.classList.remove("orange2");
            rating2.classList.remove("orange2");
            rating1.classList.add("orange2");

        });

    }

    // setting a value into the state when the user clicks on the stars so that we can pass it into the input hidden and get it into the backend
    handleRatingValue5 = () => {

        this.setState({ handleRatingValue: 5});

    }

    handleRatingValue4 = () => {

        this.setState({ handleRatingValue: 4 });

    }

    handleRatingValue3 = () => {

        this.setState({ handleRatingValue: 3 });

    }

    handleRatingValue2 = () => {

        this.setState({ handleRatingValue: 2 });

    }

    handleRatingValue1 = () => {

        this.setState({ handleRatingValue: 1 });

    }

    render() {

        return(
<>
            <WriteReviewStyle>

                <h1>write a review for this product!</h1>

                {this.state.message && (<MessageStyles><h1>{this.state.message}</h1></MessageStyles>) }

                <span onClick={this.handleRatingValue1} onMouseOver={this.handleRating} id="rating-1" ><FaStar /></span>

                <span onClick={this.handleRatingValue2} onMouseOver={this.handleRating} id="rating-2" ><FaStar /></span>

                <span onClick={this.handleRatingValue3} onMouseOver={this.handleRating} id="rating-3" ><FaStar /></span>

                <span onClick={this.handleRatingValue4} onMouseOver={this.handleRating} id="rating-4" ><FaStar /></span>

                <span onClick={this.handleRatingValue5} onMouseOver={this.handleRating} id="rating-5" ><FaStar /></span>

                <input type="hidden" name="star" value={this.state.handleRatingValue} />

                <textarea onChange={this.handleChange} value={this.state.review} name="review" placeholder="write a review for this product" cols="100" rows="15"></textarea>

                <button onClick={this.fetchData}>send review</button>

                <hr></hr>

                {/* sending the user id so that we have a way to show the remove review button only if review is of the user */}
                <ViewReview userId={this.props.userId} itemId={this.props.itemId} />

            </WriteReviewStyle>

</>
        )

    }

}

export default WriteReview;