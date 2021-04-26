import React, { Component } from 'react';
import { FaStar } from 'react-icons/fa';

import ReviewStyle from './styles/ReviewStyle';
import MessageStyles from '../components/styles/MessageStyles';

class Review extends Component {

    state = {

        review: '',
        message: null,

    }

    handleChange = e => {

        this.setState({ review: e.target.value });

    }

    fetchData = e => {

        e.preventDefault();

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

    render() {

        return (
<>
            {this.state.message && (<MessageStyles><h1>{this.state.message}</h1></MessageStyles>) }

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

                    <div id="stars">5 star</div>
                    
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
                        
                    <div id="stars">4 star</div>
                
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
                    
                    <div id="stars">3 star</div>
                
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
                        
                    <div id="stars">2 star</div>
                
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

                <div id="write-review-container">

                    <h1>write a review for this product!</h1>

                    <textarea onChange={this.handleChange} value={this.state.review} name="review" placeholder="write a review for this product" cols="100" rows="15"></textarea>

                    <button onClick={this.fetchData}>send review</button>

                </div>

        </ReviewStyle>
</>
        )

    }

}

export default Review;