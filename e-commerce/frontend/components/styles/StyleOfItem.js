import styled from 'styled-components';

const StyleOfItem = styled.div`

  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  border: 5px solid white;
  padding: 20px;
  font-weight: 600;
  text-align: center;
  margin: 2rem;
  word-wrap: break-word;
  
  @media only screen and (max-width: 300px) and (max-width: 420px) {

    width: 95%;
    margin: 1rem auto;

  }

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

  }

  h1 {

    text-transform: uppercase;
    font-size: 2rem;

  }

  button, a {

    width: auto;
    background: green;
    color: white;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
    margin: 1rem;
    
  }

  button:hover {

    cursor: pointer;

  }

`;

export default StyleOfItem;