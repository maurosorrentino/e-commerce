import styled from 'styled-components';

const NavStyle = styled.ul`

  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 1.5rem;

  span {

    padding: 0 1rem;
    display: flex;
    align-items: center;
    position: relative;

  }

  @media only screen and (max-width: 600px) {

    span {

      font-size: .5rem;

    }

  }

  span:hover {

    color: yellowgreen;

  }

  a,
  button {

    padding: 1rem 4rem;
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-size: 1em;
    background: none;
    border: 0;
    cursor: pointer;
    color: yellowgreen;
    font-weight: 700;

    @media (max-width: 700px) {

      font-size: .5rem;
      padding: 0 10px;

    }

    @media only screen and (min-width: 700px) and (max-width: 1100px) {

      font-size: .5rem;

    }

    &:after {

      height: 2px;
      background: green;
      content: '';
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      left: 50%;
      margin-top: 4rem;

    }

    &:hover,
    &:focus {

      outline: none;

      &:after {

        width: calc(100% - 60px);

      }
    }
  }

  @media (max-width: 1300px) {

    border-top: 1px solid lightgreen;
    width: 100%;
    justify-content: center;
    font-size: 1.5rem;

  }
`;

export default NavStyle;