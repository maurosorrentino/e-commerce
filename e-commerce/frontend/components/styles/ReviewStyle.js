import styled from 'styled-components';

const ReviewStyle = styled.div`

    box-shadow: 0 2px 3rem rgba(0, 0, 0, 0.30);
    margin: 2rem;
    text-transform: uppercase;

    button {

        width: auto;
        background: green;
        color: white;
        border: 0;
        font-size: 2rem;
        font-weight: 600;
        padding: 0.5rem 1.2rem;
        margin: 1rem;
        text-transform: uppercase;

    }

    button:hover {

        cursor: pointer;

    }

    .orange, .orange2 {

        color: orange;

    }

    #side-middle-margin-bottom {

        margin-bottom: 2rem;

    }

    #write-review-container {

        text-align: center;

    }

    textarea {

        margin: 2rem auto;
        display: block;

    }

    .heading {

        font-size: 1.5rem;
        margin-right: .5rem;

    }

    .checked {

      color: orange;

    }

    #stars {

        margin-left: 10px;

    }

    #total-reviews {

        margin-right: 10px;

    }

    #user-rating {

        text-align: center;
        margin: 1rem;

    }

    /* 3 column layout */
    .side {

        float: left;
        width: 15%;
        margin-top: 10px;

    }

    .middle {

        float: left;
        width: 70%;
        margin-top: 10px;
        
    }

    /* Place text to the right */
    .right {

       text-align: right;

    }

    /* The bar container */
    .bar-container {

        width: 100%;
        background-color: #f1f1f1;
        text-align: center;
        color: white;
        
    }

    /* Individual bars */
    .bar-5 {
        
        width: 60%; 
        height: 18px; 
        background-color: #4CAF50;
        
    }
    
    .bar-4 {
        
        width: 30%; 
        height: 18px; 
        background-color: #2196F3;
        
    }
    
    .bar-3 {
        
        width: 10%; 
        height: 18px; 
        background-color: #00bcd4;
        
    }
    
    .bar-2 {
        
        width: 4%; 
        height: 18px; 
        background-color: #ff9800;
        
    }
    
    .bar-1 {
        
        width: 15%; 
        height: 18px; 
        background-color: #f44336;
        
    }

    hr {

        border: 2px solid gray;

    }

    @media only screen and (max-width: 420px) {

        li {

            max-width: 50%;
            margin-left: 1rem;

        }

    }

    @media only screen and (max-width: 300px) {

        li {

            max-width: 35%;

        }

    }

    @media only screen and (min-width: 300px) and (max-width: 350px) {

        li {

            max-width: 45%;

        }

    }

    @media only screen and (min-width: 420px) and (max-width: 600px) {

        li {

            max-width: 70%;
            margin-left: 1rem;

        }

    }

`;

export default ReviewStyle;