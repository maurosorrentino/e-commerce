import styled from "styled-components";

const CartStyle = styled.div`
  ul {
    list-style: none;
    padding: 0;
    margin: 1rem auto;
    width: 80%;
    display: block;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.2rem;
    box-shadow: 0 2px 10px green;
    margin-bottom: 1rem;
    max-width: 95%;
    flex-wrap: wrap;
  }

  @media only screen and (max-width: 300px) {
    li {
      max-width: 100%;
    }
  }

  @media only screen and (min-width: 300px) and (max-width: 350px) {
    ul {
      max-width: 90%;
    }

    li {
      width: 100%;
    }
  }

  @media only screen and (min-width: 350px) and (max-width: 370px) {
    li {
      max-width: 100%;
    }

    ul {
      width: 70%;
    }
  }

  @media only screen and (min-width: 370px) and (max-width: 400px) {
    li {
      max-width: 100%;
    }

    ul {
      width: 60%;
    }
  }

  @media only screen and (min-width: 400px) and (max-width: 500px) {
    li {
      max-width: 100%;
      margin: 1rem;
    }

    ul {
      width: 100%;
    }
  }

  @media only screen and (min-width: 500px) and (max-width: 550px) {
    li {
      max-width: 100%;
    }

    ul {
      width: 85%;
    }
  }

  @media only screen and (min-width: 550px) and (max-width: 600px) {
    li {
      max-width: 100%;
    }

    ul {
      width: 75%;
    }
  }

  @media only screen and (min-width: 600px) and (max-width: 800px) {
    li {
      max-width: 100%;
    }

    ul {
      width: 95%;
    }
  }

  h1,
  p {
    margin: 1rem;
    text-align: center;
    font-weight: 600;
    color: green;
    text-transform: uppercase;
  }

  h1 {
    color: black;
    font-size: 1rem;
  }

  button {
    background: red;
    color: white;
    border: 0;
    font-size: 0.7rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
    border-radius: 4px;
    margin-right: 0.7rem;
  }

  button:hover {
    cursor: pointer;
  }

  #checkoutButton {
    margin: 1rem auto;
    display: block;
    background-color: green;
    font-size: 1.5rem;
    text-transform: uppercase;
  }
`;

export default CartStyle;
