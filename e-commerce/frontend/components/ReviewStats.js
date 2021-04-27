import React, { Component } from 'react';
import { FaStar } from 'react-icons/fa';

import ReviewStyle from './styles/ReviewStyle';
import WriteReview from '../components/WriteReview';

class ReviewStats extends Component {

    render() {

        return (
<>
            <ReviewStyle>

                <div id="user-rating">

                    <span className="heading">user rating</span>

                    <span><FaStar /></span>

                    <span><FaStar /></span>

                    <span><FaStar /></span>

                    <span><FaStar /></span>

                    <span><FaStar /></span>

                    <p>NUMBER average based on NUMBER reviews</p>

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
                        
                    <div id="total-reviews">150</div>
                
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
                        
                    <div id="total-reviews">63</div>
                
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
                        
                    <div id="total-reviews">15</div>
                
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
                    
                    <div id="total-reviews">6</div>
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
                        
                    <div id="total-reviews">20</div>
                    
                </div>

                <WriteReview itemId={this.props.itemId} />

        </ReviewStyle>
</>
        )

    }

}

export default ReviewStats;