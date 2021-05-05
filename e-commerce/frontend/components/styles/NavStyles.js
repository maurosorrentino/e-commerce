import styled from 'styled-components';

const NavStyle = styled.ul`

  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 1.5rem;

  button {

    padding: 1rem 2.8rem;
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
      color: green;

      &:after {

        width: calc(100% - 60px);

      }
    }
  }

  @media only screen and (max-width: 350px) {

    button {

      font-size: .8rem;
      padding: 4px 4px;

    }

  }

  @media only screen and (min-width: 350px) and (max-width: 450px) {

    button {

      font-size: 1rem;
      padding: 4px 4px;

    }

  }

  @media only screen and (min-width: 450px) and (max-width: 800px) {

    button {

      padding: 4px 4px;
      font-size: 2rem;

    }

  }

  @media only screen and (min-width: 800px) and (max-width: 1200px) {

    button {

      font-size: 1.5rem;
      padding: 1rem 2rem;

    }

  }

  @media only screen and (min-width: 450px) and (max-width: 600px) {

    button {

      font-size: 1.5rem;

    }

  }

  @media only screen and (max-width: 1300px) {

    border-top: 1px solid lightgreen;
    width: 100%;
    justify-content: center;
    font-size: 1.5rem;

  }

`;

export default NavStyle;