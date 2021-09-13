import styled from "styled-components";

const PayoutStyle = styled.div`
  margin: 1rem auto;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ul {
    list-style: none;
    box-shadow: 0 10px 3rem green;
    padding: 2rem;
    margin: 3rem;
  }

  li {
    font-size: 2rem;
    line-height: 2;
  }

  span {
    color: green;
  }

  a {
    box-shadow: 0 10px 3rem green;
    display: block;
    margin: 4rem auto;
    width: 50%;
    text-align: center;
    padding: 3rem;
    font-size: 2rem;
  }

  a:hover,
  a:focus {
    color: green;
  }

  @media only screen and (max-width: 300px) {
    word-wrap: break-word;

    h1 {
      margin-left: 2rem;
    }
  }

  @media only screen and (max-width: 420px) {
    h1 {
      font-size: 1rem;
    }

    li {
      font-size: 1rem;
    }

    ul {
      padding: 1rem;
      max-width: 80%;
    }

    a {
      font-size: 1rem;
      padding: 1rem;
    }
  }

  @media only screen and (min-width: 420px) and (max-width: 600px) {
    h1 {
      font-size: 1rem;
    }

    li {
      font-size: 1rem;
    }

    ul {
      padding: 1rem;
      max-width: 80%;
    }

    a {
      font-size: 1rem;
      padding: 1rem;
    }
  }
`;

export default PayoutStyle;
