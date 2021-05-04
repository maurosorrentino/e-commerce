import styled from 'styled-components';

const Logo = styled.h1`

  font-size: 4rem;
  transform: skew(-30deg);
  text-align: center;

  a {

    padding: 0.5rem 1rem;
    background: yellowgreen;
    color: white;
    text-transform: uppercase;
    text-decoration: none;

  }

  a:hover, a:focus {

    cursor: pointer;
    background: green;
    color: yellowgreen;

  }

`;

export default Logo;