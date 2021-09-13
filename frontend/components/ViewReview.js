import React, { Component } from "react";

import { FaStar } from "react-icons/fa";
import ViewReviewStyle from "../components/styles/ViewReviewStyle";
import RemoveReview from "../components/RemoveReview";

class ViewReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
    };

    this.fetchData = this.fetchData.bind(this);
  }

  fetchData = () => {
    const itemId = this.props.itemId;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/view-review/${itemId}`, {
      method: "GET",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })

      .then((resData) => {
        // mapping the reviews so that we can show them into the component
        this.setState({
          reviews: resData.reviews.map((review) => {
            let reviewRating;

            /* making the number (rating) stars */
            if (review.rating === 5) {
              reviewRating = (
                <>
                  {" "}
                  <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />{" "}
                </>
              );
            }

            if (review.rating === 4) {
              reviewRating = (
                <>
                  {" "}
                  <FaStar /> <FaStar /> <FaStar /> <FaStar />{" "}
                </>
              );
            }

            if (review.rating === 3) {
              reviewRating = (
                <>
                  {" "}
                  <FaStar /> <FaStar /> <FaStar />{" "}
                </>
              );
            }

            if (review.rating === 2) {
              reviewRating = (
                <>
                  {" "}
                  <FaStar /> <FaStar />{" "}
                </>
              );
            }

            if (review.rating === 1) {
              reviewRating = (
                <>
                  {" "}
                  <FaStar />{" "}
                </>
              );
            }

            return (
              <ViewReviewStyle key={review._id}>
                <span className="orange">{reviewRating}</span>

                {/* if the user id is equal to the one that the review has into the db (so this user made the review) we show the remove button */}
                {this.props.userId === review.userId && (
                  <RemoveReview
                    itemId={this.props.itemId}
                    reviewId={review._id}
                  />
                )}

                <h1>{review.text}</h1>
              </ViewReviewStyle>
            );
          }),
        });
      })

      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div>
        {this.state.reviews.length === 0 && (
          <h1>there are no reviews for this item</h1>
        )}

        {this.state.reviews.length >= 1 && (
          <h1>
            review{this.state.reviews.length > 1 ? "s" : ""} of this item:
          </h1>
        )}

        {this.state.reviews}
      </div>
    );
  }
}

export default ViewReview;
