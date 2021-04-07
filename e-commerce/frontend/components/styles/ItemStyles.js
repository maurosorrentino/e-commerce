import styled from 'styled-components';

const ItemStyle = styled.div`

  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  border: 5px solid white;
  padding: 20px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  text-align: center;
  margin: 2rem;

  img {

    width: 100%;
    height: 400px;
    object-fit: cover;

  }

  p {

    font-size: 10px;
    line-height: .3;
    font-weight: 300;
    flex-grow: 1;
    font-size: 1.5rem;

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
    padding: 0.5rem 1.2rem;
    
  }

`;

export default ItemStyle;