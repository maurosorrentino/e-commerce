import styled from "styled-components";

const StyleOfItem = styled.div`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  border: 5px solid white;
  padding: 20px;
  font-weight: 600;
  text-align: center;
  margin: 2rem;
  word-wrap: break-word;

  img {
    max-width: 100%;
    height: auto;
    object-fit: cover;
  }

  p {
    line-height: 1;
    font-weight: 300;
    flex-grow: 1;
    font-size: 1.5rem;
    color: green;
  }

  h1 {
    text-transform: uppercase;
    font-size: 2rem;
  }

  button {
    width: auto;
    background: green;
    color: white;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.2rem 0.5rem;
    margin: 1rem auto;
  }

  button:hover,
  button:focus {
    cursor: pointer;
    color: yellowgreen;
  }

  button:disabled {
    opacity: 0.5;
    color: white;
    cursor: not-allowed;
  }

  .few-left {
    color: red;
    transform: rotate(-15deg);
  }

  #button-logged-out {
    font-size: 1rem;
    margin-left: 1rem;
  }

  @media only screen and (max-width: 450px) {
    width: 95%;
    margin: 1rem auto;

    h1 {
      font-size: 1.5rem;
    }

    p {
      font-size: 1rem;
    }

    button {
      font-size: 1.5rem;
    }
  }
`;

export default StyleOfItem;
