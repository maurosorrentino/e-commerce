import styled from "styled-components";

const ReviewStatsStyle = styled.div`
  box-shadow: 0 2px 3rem rgba(0, 0, 0, 0.3);
  margin: 2rem;
  padding: 1rem 0;
  text-transform: uppercase;

  #side-middle-margin-bottom {
    margin-bottom: 2rem;
  }

  .heading {
    font-size: 1.5rem;
    margin-right: 0.5rem;
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
    height: 18px;
    background-color: green;
  }

  .bar-4 {
    height: 18px;
    background-color: blue;
  }

  .bar-3 {
    height: 18px;
    background-color: lightblue;
  }

  .bar-2 {
    height: 18px;
    background-color: orange;
  }

  .bar-1 {
    height: 18px;
    background-color: red;
  }

  hr {
    border: 2px solid gray;
  }

  @media only screen and (max-width: 420px) {
    .side,
    .middle {
      width: 100%;
    }

    .right {
      text-align: left;
      margin-left: 10px;
      margin-bottom: 1rem;
    }

    textarea {
      width: 10rem;
    }

    #side-middle-margin-bottom {
      margin-bottom: 0;
    }
  }

  @media only screen and (min-width: 300px) and (max-width: 350px) {
    .heading {
      font-size: 1rem;
    }
  }

  @media only screen and (max-width: 300px) {
    .heading {
      font-size: 0.9rem;
    }

    span {
      font-size: 0.9rem;
    }
  }

  @media only screen and (min-width: 420px) and (max-width: 600px) {
    .side,
    .middle {
      width: 100%;
    }

    .right {
      text-align: left;
      margin-left: 10px;
      margin-bottom: 1rem;
    }

    textarea {
      width: 25rem;
    }

    #side-middle-margin-bottom {
      margin-bottom: 0;
    }
  }

  @media only screen and (min-width: 600px) and (max-width: 900px) {
    textarea {
      width: 35rem;
    }
  }
`;

export default ReviewStatsStyle;
