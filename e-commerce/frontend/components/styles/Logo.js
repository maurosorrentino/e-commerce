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

  a:hover {

    cursor: pointer;

  }

  @media (max-width: 1300px) {

    margin: 3rem;
    font-size: 2rem;

  }
`;

export default Logo;