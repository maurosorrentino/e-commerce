import React, { Component } from 'react';
import { FaStar } from 'react-icons/fa';

import ReviewStatsStyle from './styles/ReviewStatsStyle';
import WriteReview from '../components/WriteReview';

class ReviewStats extends Component {

    constructor(props) {
        super(props)

        this.state = {

            totalReviews: 0,
            averageReviews: 0,
            total5stars: 0,
            total4stars: 0,
            total3stars: 0,
            total2stars: 0,
            total1star: 0,
    
        }

        this.fetchData = this.fetchData.bind(this);

    }

    fetchData = () => {

        const itemId = this.props.itemId;

        fetch(`http://localhost:8090/review-stats/${itemId}`, {

            method: 'GET',

            headers: {

                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },

        })

        .then(res => {

            return res.json();

        })

        .then(resData => {

            this.setState({ totalReviews: resData.totalReviews, averageReviews: resData.averageReviews.toFixed(2), total5stars: resData.total5starsLength, 
                total4stars: resData.total4starsLength, total3stars: resData.total3starsLength, 
                total2stars: resData.total2starsLength, total1star: resData.total1starLength })

        })

        .catch(err => console.log(err));

    }

    componentDidMount() {

        this.fetchData();

    }

    render() {

        return (
<>
            <ReviewStatsStyle>

                <div id="user-rating">

                    <span className="heading">user rating</span>

                    <span className={this.state.averageReviews >= 1 ? 'checked' : ''}><FaStar /></span>

                    <span className={this.state.averageReviews >= 2 ? 'checked' : ''}><FaStar /></span>

                    <span className={this.state.averageReviews >= 3 ? 'checked' : ''}><FaStar /></span>

                    <span className={this.state.averageReviews >= 4 ? 'checked' : ''}><FaStar /></span>

                    <span className={this.state.averageReviews === 5 ? 'checked' : ''}><FaStar /></span>

                    <p>{this.state.averageReviews} average based on {this.state.totalReviews} reviews</p>

                </div>

                <hr></hr>

                <div class="side">

                    <div id="stars">5 stars</div>
                    
                </div>
                
                <div class="middle">
            
                    <div class="bar-container">
                        
                        <div class="bar-5"></div>
                        
                    </div>
                    
                </div>
                
                <div class="side right">
                        
                    <div id="total-reviews">{this.state.total5stars}</div>
                
                </div>
                
                <div class="side">
                        
                    <div id="stars">4 stars</div>
                
                </div>
                
                <div class="middle">
                        
                    <div class="bar-container">
                        
                        <div class="bar-4"></div>
                    
                    </div>
                
                </div>
                
                <div class="side right">
                        
                    <div id="total-reviews">{this.state.total4stars}</div>
                
                </div>
                    
                <div class="side">
                    
                    <div id="stars">3 stars</div>
                
                </div>
                
                <div class="middle">
                    
                    <div class="bar-container">
                        
                        <div class="bar-3"></div>
                    
                    </div>
                
                </div>
                    
                <div class="side right">
                        
                    <div id="total-reviews">{this.state.total3stars}</div>
                
                </div>
                
                <div class="side">
                        
                    <div id="stars">2 stars</div>
                
                </div>
                    
                <div class="middle">
                        
                    <div class="bar-container">
                        
                        <div class="bar-2"></div>
                    
                    </div>
                
                </div>
                    
                <div class="side right">
                    
                    <div id="total-reviews">{this.state.total2stars}</div>
                </div>
                
                <div id="side-middle-margin-bottom" class="side">
                    
                    <div id="stars">1 star</div>
                
                </div>
                
                <div id="side-middle-margin-bottom" class="middle">
                    
                    <div class="bar-container">
                        
                        <div class="bar-1"></div>
                    
                    </div>
                
                </div>
                
                <div id="side-middle-margin-bottom" class="side right">
                        
                    <div id="total-reviews">{this.state.total1star}</div>
                    
                </div>

                <WriteReview itemId={this.props.itemId} />

        </ReviewStatsStyle>
</>
        )

    }

}

export default ReviewStats;