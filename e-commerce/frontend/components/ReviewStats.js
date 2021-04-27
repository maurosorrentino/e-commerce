import React, { Component } from 'react';
import { FaStar } from 'react-icons/fa';

import ReviewStatsStyle from './styles/ReviewStatsStyle';
import WriteReview from '../components/WriteReview';

class ReviewStats extends Component {

    state = {

        totalReviews: 0,
        averageReviews: 0,
        total5stars: 0,
        total4stars: 0,
        total3stars: 0,
        total2stars: 0,
        total1star: 0,

    }

    render() {

        return (
<>
            <ReviewStatsStyle>

                <div id="user-rating">

                    <span className="heading">user rating</span>

                    <span><FaStar /></span>

                    <span><FaStar /></span>

                    <span><FaStar /></span>

                    <span><FaStar /></span>

                    <span><FaStar /></span>

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